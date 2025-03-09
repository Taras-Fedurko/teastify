// @verified
"use client"

import React from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import { Form,  FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form'
import { LoadingSpinner } from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFormSubmit } from '@/modules/auth/hooks/useFormSubmit';

import { forgotPasswordAction } from '../lib/forgot-password';
import { ForgotPasswordSchema } from '../auth.schema';
import FormFeedback from './FormFeedback';

export default function ForgotPasswordForm() {
  const { executeRecaptcha } = useGoogleReCaptcha()

  const { form, isPending, onSubmit, message } = useFormSubmit({
    schema: ForgotPasswordSchema,
    onSubmitAction: forgotPasswordAction,
    defaultValues: { "email": "" },
    captcha :{
      enableCaptcha: process.env.NODE_ENV === 'production',
      executeRecaptcha,
      action: "forgotpassword_form",
      tokenExpiryMs: 120000,
    }
  });

  return (
    <>
    <h2 className="text-2xl font-bold mb-4">Reset Your Password</h2>
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name={"email"}
            render={({ field }) => (
              <FormItem >
                <FormLabel>
                  Email
                </FormLabel>
                <FormControl >
                  <Input disabled={isPending} className="h-10" placeholder='xyz@yourmail.com' type={"email"} {...field} />
                </FormControl>
                <FormFeedback type="error" message={form.formState.errors.email?.message} />
              </FormItem>
            )}
          />
         {message &&  <FormFeedback type={message.type} message={message.message} />}
         <Button disabled={isPending} type='submit' className='w-full mt-6'>
            {isPending ? (
              <>
                Resetting Password
                <LoadingSpinner />
              </>
            ) : "Confirm Reset Password"}
          </Button>
        </form>
      </Form>
    </>
  )
}
