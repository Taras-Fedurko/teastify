import React, { PropsWithChildren } from 'react';
import { SessionProvider } from 'next-auth/react';

import { TooltipProvider } from '@/components/ui/tooltip';

import NextThemeProvider from './ThemeProvider';

export default function Provider({ children }: PropsWithChildren) {
  return (
    <NextThemeProvider>
      <TooltipProvider>
        <SessionProvider>
          {children}
        </SessionProvider>
      </TooltipProvider>
    </NextThemeProvider>
  )
}
