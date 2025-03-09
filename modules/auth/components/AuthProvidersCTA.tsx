// @verified
'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

import { Button } from '@/components/ui/button';
import useAuthProviders from '../useAuthProviders';
import { availableProviders } from '../auth.config';

interface Props {
  withDescription?: boolean;
}

export default function AuthProvidersCTA({ withDescription = false }: Props) {
  const providers = useAuthProviders();

  const handleSignIn = async (provider: availableProviders) => {
    try {
      await signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
    } catch (error) {
      console.error(`Error signing in with ${provider}:`, error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center">
        <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
        <span className="px-3 text-sm text-gray-500 dark:text-gray-400">or</span>
        <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
      </div>

      <div className={`flex items-center justify-center gap-3 ${withDescription ? "flex-wrap":""}`}>
        {providers.map(({ id, name, Icon }) => (
          <Button
            key={id}
            onClick={() => handleSignIn(id)}
            variant="secondary"
            className="w-full"
          >
            <Icon aria-label={`${name} icon`} />
            Continue with {name}
          </Button>
        ))}
      </div>
    </div>
  );
}
