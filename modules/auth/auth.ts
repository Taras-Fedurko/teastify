// @verified
import NextAuth from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRolesEnum } from "@prisma/client";
import { routes } from "@/routes";
import prisma from "@/lib/prisma";

import { sendVerificationRequest } from "./sendRequest";
import userRepository from "./data/user";
import authConfig from "./auth.config";

export const nextAuth = NextAuth({
  pages: {
    signIn: routes.auth.signIn,
    verifyRequest: routes.auth.verifyRequest,
    error: routes.auth.authError,
    signOut: routes.auth.signOut,
  },
  events: {
    linkAccount: async ({ user }) => {
      if (!user.id) {
        return;
      }

      await userRepository.verifyUserEmail(user.id)
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      const provider = account?.provider;

      if (provider !== "credentials" && provider !== "http-email") {
        return true;
      }

      if (!user || !user.id) {
        return false;
      }

      const existingUser = await userRepository.getUserById(user.id);

      if (
        !existingUser ||
        (provider === "credentials" && !existingUser.emailVerified)
      ) {
        return provider === "http-email" ? routes.auth.signUp : false;
      }

      return true;
    },

    //  jwt is called when the JWT is created
    async jwt(jwt) {
      const { token } = jwt;

      if (!token.sub) {
        return token;
      }

      const existingUser = await userRepository.getUserById(token.sub);

      if (!existingUser) {
        return token;
      }

      token.email = existingUser.email;
      token.name = existingUser.name;
      token.role = existingUser.role;

      return token;
    },
    // session uses the JWT token to create and generate the session object
    async session({ session, token }) {
      if (session.user) {
        if (token.role) session.user.role = token.role as UserRolesEnum;
        if (token.sub) session.user.id = token.sub;
        if (token.email) session.user.email = token.email;
        if (token.name) session.user.name = token.name;
        if (token.picture) session.user.image = token.picture;
      }

      return session;
    },
  },
  adapter: PrismaAdapter(prisma),

  session: { strategy: "jwt" },
  trustHost: authConfig.trustHost,
  
  providers: [
    ...authConfig.providers,
    {
      id: "http-email",
      name: "Email",
      sendVerificationRequest: sendVerificationRequest,
      options: {},
      maxAge: 60 * 60,
      from: "onboarding@contentstream.com", // TODO
      type: "email",
    },
  ],
});
