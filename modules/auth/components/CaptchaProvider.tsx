"use client"

// @verified
import { PropsWithChildren } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

import { recaptcha_config } from "@/modules/auth/constants"

export default function CaptchaClientProvider({ children }: PropsWithChildren) {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={recaptcha_config.sitekey}>
      {children}
    </GoogleReCaptchaProvider>
  );
}
