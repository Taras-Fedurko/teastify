// @verify

import { readFile } from "fs/promises";
import * as path from "path";

type TemplateFileName = "verification" | "reset-password";

export class TemplateService {
  private static readonly TEMPLATE_DIR = path.resolve(process.cwd(), "modules/auth/services/templates");

  /**
   * Retrieves and processes an HTML template file.
   * @param fileName - The name of the template file (e.g., "verification.html").
   * @param replacements - A record of key-value pairs to replace in the template.
   * @returns The processed template string.
   */
  static async getTemplate(fileName: `${TemplateFileName}.html`, replacements: Record<string, string>): Promise<string> {
    const filePath = path.join(TemplateService.TEMPLATE_DIR, fileName);
    let template = await readFile(filePath, "utf-8");

    for (const [key, value] of Object.entries(replacements)) {
      const pattern = new RegExp(`{{${key}}}`, "g");
      template = template.replace(pattern, value);
    }

    return template;
  }
}
