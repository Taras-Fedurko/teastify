import React from 'react'

import NewPasswordForm from '@/modules/auth/components/NewPasswordForm'
import { routes } from '@/routes'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

export default async function NewPasswordPage({ searchParams }: { searchParams: Promise<{ token?: string | undefined }> }) {
  const { token } = await searchParams;
  
  return (
    <div className="flex h-screen w-full">
      <div className="flex flex-1 items-center justify-center bg-slate-50 dark:bg-gradient-to-br dark:from-zinc-800 dark:via-zinc-900 dark:to-black">
        <div className="absolute left-4 top-4">
          <Link
            href={routes.auth.signIn}
            className="inline-flex items-center text-sm text-primary hover:underline dark:text-primary-foreground"
          >
            <ArrowLeftIcon className="mr-1" />
            Back
          </Link>
        </div>
        <div className="w-full max-w-[500px] p-6 sm:p-8 shadow-sm rounded-xl border bg-white dark:bg-zinc-950 m-4 md:m-0">
          <NewPasswordForm token={token} />
        </div>
      </div>
    </div>
  );
}
