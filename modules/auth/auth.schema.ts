// @verified
import * as z from 'zod';

const emailSchema = z.string().email({ message: 'Please enter a valid email address' });
const passwordSchema = z.string().min(7, { message: 'Password is required' });

export const ForgotPasswordSchema = z.object({
  email: emailSchema,
});

export const ResetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const LoginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, { message: 'Password is required' }),
});

export const SignupSchema = z.object({
  name: z.string(),
  email: emailSchema,
  password: passwordSchema,
});

export const MagicSignInSchema = z.object({
  email: emailSchema,
});

export type MagicSignInType = z.infer<typeof MagicSignInSchema>;
export type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>;
export type LoginSchemaType = z.infer<typeof LoginSchema>;
export type SignupSchemaType = z.infer<typeof SignupSchema>;
export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;
