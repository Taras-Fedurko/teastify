import React from 'react'
import EmailVerifyForm from '@/modules/auth/components/EmailVerifyForm'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ token?: string | undefined }>;
}) {
  const token = (await searchParams).token;

  return <EmailVerifyForm token={token} />;
}
