// @verified
'use client';

import React, { useState } from 'react';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { ControllerRenderProps } from 'react-hook-form';

import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import FormFeedback from './FormFeedback';

interface Props {
  isPending: boolean;
  message?: string;
  label?: string;
  field:
  | ControllerRenderProps<{
      email: string;
      password: string;
    }, "password">
  | ControllerRenderProps<{
    name: string;
    email: string;
    password: string;
  }, "password">
  | ControllerRenderProps<{
    password: string;
    confirmPassword: string;
  }, "password">
  | ControllerRenderProps<{
    password: string;
    confirmPassword: string;
  }, "confirmPassword">;
}

export default function PasswordInput({
  isPending,
  field,
  message,
  label,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormItem>
      <FormLabel>{label ?? "Password"}</FormLabel>
      <FormControl>
        <div className="relative">
          <Input
            disabled={isPending}
            placeholder="Enter your password"
            type={showPassword ? 'text' : 'password'}
            className="h-10"
            {...field}
          />
          <span
            className="absolute top-2.5 right-2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOpenIcon className="w-5 h-5" /> : <EyeClosedIcon className="w-5 h-5" />}
          </span>
        </div>
      </FormControl>
      <FormFeedback type="error" message={message} />
    </FormItem>
  );
}