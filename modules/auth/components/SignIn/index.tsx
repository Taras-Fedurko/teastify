// @verified
'use client';

import React, { Suspense, useState } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { routes } from '@/routes';

import AuthProvidersCTA from '../AuthProvidersCTA';
import SignInForm from './SignInForm';

const MagicLinkSigninForm = React.lazy(() => import('./MagicLinkSignin'));

interface Props {
  searchParams: Record<string, number | string | null>;
}

export default function SignInComponent({ searchParams }: Props) {
  const [withCredentials, setWithCredentials] = useState(!searchParams['signin-with-link']);

  const toggleSignInType = () => setWithCredentials(!withCredentials);

  return (
    <div>
      {withCredentials ? (
        <SignInForm />
      ) : (
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <MagicLinkSigninForm />
        </Suspense>
      )}
      
      <p className="mt-4 text-sm">
        <Link href={routes.auth.signUp} className="mr-2 hover:underline">
          Create an Account!{' '}
        </Link>
        <span className="opacity-70">If you don&apos;t have one.</span>
      </p>
      
      <Button onClick={toggleSignInType} variant="outline" className="w-full mt-4 mb-4">
        {withCredentials ? 'Sign In With Magic Link' : 'Sign In With Credentials'}
      </Button>
      
      <AuthProvidersCTA />
    </div>
  );
};
