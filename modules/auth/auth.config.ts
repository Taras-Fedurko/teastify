// @verified
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";

import { LoginSchema } from "./auth.schema";
import userRepository from "./data/user";

export default {
  trustHost : true,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validate = await LoginSchema.parseAsync(credentials);

        if (!validate) {
          return null;
        }

        const { email, password } = validate;

        const user = await userRepository.getUserByEmail(email);

        if (!user || !user.password) {
          return null;
        }

        const matched = await bcrypt.compare(password, user.password);

        if (matched) {
          return user;
        }

        return null;
      },
    }),
    Google({
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      clientId: process.env.GOOGLE_CLIENT_ID,
    }),
  ],
} satisfies NextAuthConfig;

type ProvidersUsed = 'credentials' | 'google';

export type availableProviders = (ProvidersUsed)[number];
