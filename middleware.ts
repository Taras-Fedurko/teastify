// @verified
import NextAuth from "next-auth";

import authConfig from "./modules/auth/auth.config";
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
  routes,
} from "./routes";

// Get all admin routes from the routes configuration
const adminRoutes = Object.values(routes.admin);

// Define protected API routes that require authentication
const protectedApiRoutes = [
  // User-specific routes
  '/api/user',
  '/api/profile',
  '/api/my',
  
  // Protected features
  '/api/meal-plans',
  '/api/favorites',
  '/api/nutrition',
  
  // Admin routes
  '/api/admin',
];

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  
  const isApiAuth = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isApiRoute = nextUrl.pathname.startsWith('/api');
  const isProtectedApiRoute = protectedApiRoutes.some(route => nextUrl.pathname.startsWith(route));
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAdminRoute = adminRoutes.includes(nextUrl.pathname);
  
  // Allow all auth API routes
  if (isApiAuth) {
    return;
  }

  // Allow public API routes but protect specific ones
  if (isApiRoute) {
    if (isProtectedApiRoute && !isLoggedIn) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return;
  }
  
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL(routes.auth.signIn, nextUrl));
  }

  if (isAdminRoute) {    
    // TODO: Check if user is admin
    // return Response.redirect(new URL('/', nextUrl));
  }
  
  return;
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
