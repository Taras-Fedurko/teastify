"use client";

import Image from "next/image";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="grid h-screen items-center bg-background pb-8 lg:grid-cols-2 lg:pb-0">
      {/* Left Section */}
      <div className="text-center">
        <p className="text-base font-semibold text-muted-foreground">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl lg:text-7xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-muted-foreground">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-2">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8"
          >
            Go back home
          </Link>
        </div>
      </div>
      {/* Right Section */}
      <div className="hidden lg:block">
        <Image
          alt="not found image"
          loading="lazy"
          width="300"
          height="400"
          decoding="async"
          className="w-full object-contain lg:max-w-2xl"
          src="https://dashboard.shadcnuikit.com/images/404.svg"
        />
      </div>
    </div>
  );
}
