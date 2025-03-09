// @verified
"use client"
import { useMemo, JSX } from "react"
import Google from "@/lib/icons/Google";

import { availableProviders } from "./auth.config";

interface Provider {
  name: string;
  id: availableProviders;
  Icon: ({ size }: { size?: number }) => JSX.Element;
}

export default function useAuthProviders() {
  const providers: Provider[] = useMemo(() => [
    {
      name: 'Google',
      id: 'google',
      Icon: Google,
    },    
  ], []);

  return providers
}
