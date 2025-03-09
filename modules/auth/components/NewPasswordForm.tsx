// @verified
"use client"
import React from 'react'

import { Form, FormField } from '@/components/ui/form'
import { Button } from '@/components/ui/button';
import { useFormSubmit } from '@/modules/auth/hooks/useFormSubmit';
import { LoadingSpinner } from '@/components/Spinner';

import { resetPasswordAction } from '../lib/forgot-password';
import { ResetPasswordSchema } from '../auth.schema';

import FormFeedback from './FormFeedback';
import PasswordInput from './PasswordInput';

interface NewPasswordFormProps {
  token?: string
}

export default function NewPasswordForm({ token }: NewPasswordFormProps) {
  const { form, isPending, message, onSubmit } = useFormSubmit({
    schema: ResetPasswordSchema,
    onSubmitAction: async (data) => {
      if (!token) {
        return { message: "No Token Found", "success": false };
      }

      return await resetPasswordAction(token, data)
    },
    defaultValues: {
      confirmPassword: "",
      password: "",
    }
  });

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Reset Your Password</h2>

      <Form {...form}>
        <form action={""} onSubmit={onSubmit} className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name={"password"}
            render={({ field }) => (
              <PasswordInput field={field} isPending={isPending} message={form.formState.errors.password?.message} />
            )}
          />
          <FormField
            control={form.control}
            name={"confirmPassword"}
            render={({ field }) => (
              <PasswordInput
                field={field}
                isPending={isPending}
                message={form.formState.errors.confirmPassword?.message}
                label="Confirm Password"
              />
            )}
          />
          {message && <FormFeedback type={message.type} message={message.message} />}
          
          <Button disabled={isPending} type='submit' className='w-full mt-6'>
            {isPending ? (
              <>
                Changing Password
                <LoadingSpinner />
              </>
            ) : "Change Password"}
          </Button>
        </form>
      </Form>
    </>
  );
}
