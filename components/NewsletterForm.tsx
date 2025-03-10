'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function NewsletterForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
  };

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <Input
        type="email"
        placeholder="Enter your email"
        className="max-w-[240px]"
      />
      <Button type="submit">Subscribe</Button>
    </form>
  );
} 