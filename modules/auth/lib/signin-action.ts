"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

import { signOut } from "@/auth";
import prisma from "@/lib/prisma";

import { LoginSchema, LoginSchemaType } from "../auth.schema";
import { createVerificationToken } from "../data";
import { CaptchaActionOptions } from "../types/captcha";
import { reCaptchaSiteVerify } from "./recaptcha";
import { MessageResponse } from "../types/auth";
import { sendEmailVerification } from "./common";
import { routes } from "@/routes";

export async function signInAction(
  data: LoginSchemaType,
  captchaOptions : CaptchaActionOptions
): Promise<MessageResponse> {  
  const validate = await LoginSchema.safeParseAsync(data);

  if (!validate.success) {
    return {
      message: validate.error.errors[0].message,
      success: false,
    };
  }

  if (process.env.DISABLE_CAPTCHA !== 'true') {
    const googleResponse = await reCaptchaSiteVerify(captchaOptions);

    if (!googleResponse.success) {
      return {
        message: googleResponse.message,
        success: false,
      };
    }
  }

  const { email, password } = validate.data;
  
  const user = await prisma.user.findUnique({
    where: { email },
  });

  const ERROR_INVALID_CREDENTIALS = "Invalid credentials";

  // if user is not found or email or password is not provided
  if (!user || !user.email || !user.password) {
    return {
      message: ERROR_INVALID_CREDENTIALS,
      success: false,
    };
  }
  
  // if user is not verified
  if (!user.emailVerified) {
    const token = await createVerificationToken(email);

    if (!token) {
      return { message: "Something went wrong!", success: false };
    }

    await sendEmailVerification(email, token?.token);

    return {
      message: "Confirmation Email Sent",
      success: true,
    };
  }

  try {    
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return {
      redirect: routes.dashboard,
      message: '',
      success: true,
    };
  } catch (error) {
    console.error(error)
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: ERROR_INVALID_CREDENTIALS, success: false };
        default:
          return { message: "Something went wrong!", success: false };
      }
    }
    throw error;
  }
}

export { signOut };

