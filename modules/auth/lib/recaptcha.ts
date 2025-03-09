// @verified
"use server";

import { recaptcha_config } from "@/modules/auth/constants";
import { CaptchaActionOptions } from "../types/captcha";

interface GoogleCaptchaResponse {
  success: boolean;
  challenge_ts: string; // e.g., '2024-09-05T18:44:32Z'
  hostname: string;
  action: string;
  score: number;
}

const CAPTCHA_VERIFICATION_URL = "https://www.google.com/recaptcha/api/siteverify";
const MIN_SCORE_THRESHOLD = 0.5;

/**
 * Verifies the provided reCAPTCHA token against Google's verification endpoint.
 * Returns a success/failure message and status.
 */
export async function reCaptchaSiteVerify({
  token,
  action,
  tokenExpiryMs = 120000, // ms
}: CaptchaActionOptions): Promise<{ success: boolean; message: string }> {
  if (process.env.DISABLE_CAPTCHA === "true") {
    return { success: true, message: "Captcha is disabled." };
  }

  if (!token) {
    console.error("Captcha token is missing.");

    return {
      success: false,
      message: "Captcha verification failed. Please try again.",
    };
  }

  const verificationUrl = `${CAPTCHA_VERIFICATION_URL}?secret=${recaptcha_config.secret}&response=${token}`;

  try {
    const response = await fetch(verificationUrl, { method: "POST" });
    const googleResponse: GoogleCaptchaResponse = await response.json();

    if (!googleResponse) {
      console.error("No response from CAPTCHA verification.");
      return {
        success: false,
        message: "Captcha validation failed. Please try again.",
      };
    }

    const { score, action: responseAction } = googleResponse;

    if (score < MIN_SCORE_THRESHOLD || responseAction !== action) {
      console.error("Captcha validation failed:", googleResponse);
      return {
        success: false,
        message: "Captcha validation failed. Please try again.",
      };
    }

    // If you need token expiry logic, uncomment and adjust accordingly
    // const tokenTimestamp = new Date(googleResponse.challenge_ts).getTime();
    // if (Date.now() - tokenTimestamp > tokenExpiryMs) {
    //   return { success: false, message: "Captcha token expired." };
    // }

    return { success: true, message: "Captcha verified successfully." };
  } catch (error) {
    console.error("Error during CAPTCHA verification:", error);
    return {
      success: false,
      message: "CAPTCHA verification encountered an error.",
    };
  }
}
