/**
 * Map of all routes
 * @type {Record<string, string | Record<string, string>>}
 */
export const routes = {
  landing: '/',

  auth: {
    signIn: '/sign-in',
    signUp: '/sign-up',
    signOut: '/sign-out',
    forgorPassword: '/forgot-password',
    newPassword: '/new-password',
    emailVerify: "/email-verify",
    verifyRequest: "/verify-request",
    authError: "/auth-error", 
  },
}

/**
 * Routes accessible to the public are listed here in an array 
 * @type {string[]}
 */
export const publicRoutes: string[] = [
  routes.landing,
 ];
 
/**
 * Routes for authentication are listed here in an array
 * @type {string[]} 
 */
export const authRoutes: string[] = [
  routes.auth.signIn,
  routes.auth.signUp,
  routes.auth.forgorPassword,
  routes.auth.newPassword,
  routes.auth.emailVerify,
  routes.auth.verifyRequest,
  routes.auth.authError,
];
 
 /**
  * Routes start with the api/auth are used for api auth purpose 
  * @type {string} 
  */
 export const apiAuthPrefix: string = '/api/auth';

 /**
  * The default route to redirect to after login
  */
 export const DEFAULT_LOGIN_REDIRECT = routes.landing;
 
/**
 * 
 * @param route helper to create routes mased on match params 
 * @param params 
 * @returns route
 */
const matchParams = (route: string, params: Record<string, string>): string => {
  return Object.keys(params).reduce((path, key) => {
    const regex = new RegExp(`:${key}`, 'g');
    return path.replace(regex, params[key]);
  }, route);
};
