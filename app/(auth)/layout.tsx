// @verified
import { PropsWithChildren } from 'react';

import CaptchaClientProvider from '@/modules/auth/components/CaptchaProvider';

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <CaptchaClientProvider>
      {children}
    </CaptchaClientProvider>
  );
};
