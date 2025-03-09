// @verified
"use server";
import prisma from "@/lib/prisma";
import { MessageResponse } from "../types/auth";
import { hashMyPassword, sendEmailVerification } from "./common";
import {  SignupSchema, SignupSchemaType } from "../auth.schema";
import { createVerificationToken } from "../data";
import { reCaptchaSiteVerify } from "./recaptcha";
import { CaptchaActionOptions } from "../types/captcha";
import { routes } from "@/routes";

export async function signUpAction(
  data: SignupSchemaType,captchaOptions : CaptchaActionOptions
): Promise<MessageResponse> {  
  const validate = SignupSchema.safeParse(data);

  if (!validate.success) {
    return {
      message: validate.error.errors[0].message || "Invalid credentials",
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

  const { email, password, name } = validate.data;

  try {
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return {
        message: "User already exists",
        success: false,
      };
    }

    // Hash the password
    const hashedPassword = await hashMyPassword(password);
    
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        // for local development - disable email verification
        ...(process.env.ENABLE_SIGN_UP_EMEAIL_VERIFICATION === "false" && { emailVerified: new Date() })
      },
    });

    const token = await createVerificationToken(email);

    if (!token) {
      return { message: "Something went wrong!", success: false };
    }
    
    
    if (process.env.ENABLE_SIGN_UP_EMEAIL_VERIFICATION === "false") {
      console.log('ENABLE_SIGN_UP_EMEAIL_VERIFICATION');
      
      return {
        redirect: routes.project.new,
        success: true,
        message: "User created"
      };
    }

    await sendEmailVerification(email, token?.token);

    return { message: "Confirmation Email Sent", success: true };
  } catch (error) {
    console.error(error);

    return {
      message: "An error occurred during sign up",
      success: false,
    };
  }
}
