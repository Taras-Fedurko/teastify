// @verified
'use client'

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { LoadingSpinner } from '@/components/Spinner';
import { useFormSubmit } from '@/modules/auth/hooks/useFormSubmit';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { routes } from '@/routes';

import { signUpAction } from '../lib/signup-action';
import { SignupSchema } from '../auth.schema';

import AuthProvidersCTA from './AuthProvidersCTA';
import PasswordInput from './PasswordInput';
import FormFeedback from './FormFeedback';

interface Props {
  searchParams?: Record<string, string | null | number>;
}

export default function SignUpForm({ searchParams }: Props) {
  const callBackError = searchParams?.["callbackError"];

  const { executeRecaptcha } = useGoogleReCaptcha();

  const { form, message, isPending, onSubmit, redirect } = useFormSubmit({
    schema: SignupSchema,
    defaultValues: {
      email: '',
      password: '',
      name: '',
    }, captcha: {
      enableCaptcha: process.env.DISABLE_CAPTCHA === 'false',
      executeRecaptcha,
      action: "credentials_signup",
      tokenExpiryMs: 120000,
    },
    onSubmitAction: signUpAction
  })

  const history = useRouter();

  useEffect(() => {
    if (redirect) {
      history.push(redirect);
    }
  }, [redirect, history]);

  useEffect(() => {
    if (!callBackError) {
      return;
    }

    toast({
      title: `User with this email ${searchParams["email"]} does not exists or verified`,
      variant: "destructive",
      description: <div className='text-sm'>
        Create a New Account or Verify it exists
        <p>
          Occurred at  {searchParams["at"]}
        </p>
      </div>
    });

  }, [callBackError, searchParams]);

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Create a New Account</h2>

      <Form {...form} >
        <form className='flex flex-col p-1 gap-4' onSubmit={onSubmit} >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem >
                <FormLabel>
                  Name
                </FormLabel>
                <FormControl>
                  <Input disabled={isPending} className="h-10" placeholder='Name' type='text' {...field} />
                </FormControl>
                <FormFeedback type="error" message={form.formState.errors.name?.message} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem >
                <FormLabel>
                  Email
                </FormLabel>
                <FormControl>
                  <Input className="h-10" disabled={isPending} placeholder='Email' type='email' {...field} />
                </FormControl>
                <FormFeedback type="error" message={form.formState.errors.email?.message} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <PasswordInput isPending={isPending} message={form.formState.errors.password?.message} field={field} />
            )}
          />

          {message && <FormFeedback type={message.type} message={message.message} />}

          <Button disabled={isPending} type='submit' className='w-full mt-6'>
            {isPending ? (
              <>
                Signing Up
                <LoadingSpinner />
              </>
            ) : "Sign Up"}
          </Button>
        </form>

        <p className='mt-2 mb-4'>
          <Link className=' mr-2 text-sm underline' href={routes.auth.signIn}>
            Aleady Have an Account?
          </Link>
        </p>
      </Form>

      <AuthProvidersCTA />
    </>
  );
};
