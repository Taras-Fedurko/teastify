import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.ENCRYPTION_PROVIDERS_KEY as string;
const IV_LENGTH = 16;

if (!ENCRYPTION_KEY || Buffer.from(ENCRYPTION_KEY, 'hex').length !== 32) {
  throw new Error('ENCRYPTION_KEY must be a 256-bit (32-byte) key in hexadecimal format.');
}

/**
 * Encrypts the given plain text using AES-256-CBC encryption.
 * @param {string} text - The text to encrypt.
 * @returns {string} - The encrypted text in Base64 format.
 */
export function encrypt(text: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return `${iv.toString('hex')}:${encrypted}`;
}

/**
 * Decrypts the given encrypted text using AES-256-CBC decryption.
 * @param {string} encryptedText - The encrypted text in Base64 format.
 * @returns {string} - The decrypted plain text.
 */
export function decrypt(encryptedText: string): string {
  const [ivHex, encrypted] = encryptedText.split(':');
  if (!ivHex || !encrypted) {
    throw new Error('Invalid encrypted text format');
  }
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}