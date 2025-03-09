import { Metadata } from "next";

import SideBackground from '@/modules/auth/components/SideBackground';
import SignInForm from "@/modules/auth/components/SignIn";

// Metadata for the signin form page
export const metadata: Metadata = {
  title: 'Content Stream - Sign in to Continue',
  description: 'Sign in to your Content Stream account to manage, schedule, and post content with ease.',
};

export default async function SignInPage({ searchParams }: { searchParams: Promise<Record<string, number | string | null>> }) {
  const qs = await searchParams;

  return (
    <div className="flex h-screen w-full">
      <SideBackground />

      <div className="flex flex-1 items-center justify-center bg-slate-50 dark:bg-zinc-950 md:dark:bg-zinc-800">
        <div className="w-full max-w-[500px] p-6 sm:p-8 shadow-sm rounded-xl border-none md:border bg-white dark:bg-zinc-950 m-4 md:m-0">
          <SignInForm searchParams={qs} />
        </div>
      </div>
    </div>
  );
}
