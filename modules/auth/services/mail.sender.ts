// @verified
import nodemailer from "nodemailer";
import { TemplateService } from "./template-service";

const { GMAIL_SENDER_EMAIL, GMAIL_SENDER_PASSWORD } = process.env;
const CURRENT_YEAR = new Date().getFullYear().toString();

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: GMAIL_SENDER_EMAIL,
        pass: GMAIL_SENDER_PASSWORD,
      },
    });
  }

  /**
   * Returns the Nodemailer transporter instance.
   */
  getTransport() {
    return this.transporter;
  }

  /**
   * Sends a reset password email using a template.
   * @param email - Recipient's email address.
   * @param verificationLink - The link to reset password.
   */
  async sendResetPasswordEmail(email: string, verificationLink: string): Promise<boolean> {
    const template = await TemplateService.getTemplate("reset-password.html", { verificationLink, year: CURRENT_YEAR });

    return this.sendEmail(email, "Resetting Password", template);
  }

  /**
   * Sends an email verification message using a template.
   * @param email - Recipient's email address.
   * @param verificationLink - The link to verify the email.
   */
  async sendVerificationEmail(email: string, verificationLink: string): Promise<boolean> {
    const template = await TemplateService.getTemplate("verification.html", { verificationLink, year: CURRENT_YEAR });

    return this.sendEmail(email, "Email Verification", template, "emailverification@yourapp.com");
  }

  /**
   * Generic method to send an email.
   * @param to - Recipient email address.
   * @param subject - Email subject.
   * @param html - HTML content of the email.
   * @param from - Sender email address (optional; defaults to configured Gmail sender).
   */
  private async sendEmail(to: string, subject: string, html: string, from = GMAIL_SENDER_EMAIL): Promise<boolean> {
    const response = await this.transporter.sendMail({ from, to, subject, html });

    return response.accepted.length > 0;
  }
}
