// @verified
'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useRouter } from 'next/navigation';

import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Typography } from '@/components/ui/typography';
import { LoadingSpinner } from '@/components/Spinner';
import { useFormSubmit } from '@/modules/auth/hooks/useFormSubmit';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { LoginSchema } from '../../auth.schema';
import { signInAction } from '../../lib/signin-action';
import FormFeedback from '../FormFeedback';
import { routes } from '@/routes';
import PasswordInput from '../PasswordInput';

export default function SignInForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const { form, onSubmit, isPending: submitting, message, captchaState, redirect } = useFormSubmit({
    schema: LoginSchema,
    defaultValues: {
      email: '',
      password: '',
    },
    captcha: {
      enableCaptcha: process.env.DISABLE_CAPTCHA === 'false',
      executeRecaptcha,
      action: 'credentials_signin',
      tokenExpiryMs: 120000,
    },
    onSubmitAction: signInAction,
  });

  const history = useRouter();
  
  useEffect(() => {
    if (redirect) {
      history.push(redirect);
    }
  }, [redirect, history]);

  const isPending = captchaState.validating || submitting;

  return (
    <>
      <Typography variant="h2" className="mb-4">Sign In to Continue</Typography>
      <Form {...form}>
        <form className="flex flex-col gap-4 w-full" onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="Enter your email"
                    type="email"
                    className="h-10"
                    {...field}
                  />
                </FormControl>
                <FormFeedback type="error" message={form.formState.errors.email?.message} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <PasswordInput field={field} isPending={isPending} message={form.formState.errors.password?.message} />
            )}
          />

          {message && <FormFeedback type={message.type} message={message.message} />}

          <Link href={routes.auth.forgorPassword} className="text-sm text-gray-500 hover:underline">
            Forgot Password?
          </Link>

          <Button
            disabled={isPending}
            type="submit"
            className={cn('w-full mt-4')}
          >
            {isPending ? (
              <div className="flex items-center justify-center gap-2">
                {captchaState.validating ? 'Performing Security Check...' : 'Submitting'}
                {submitting && <LoadingSpinner />}
              </div>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};
