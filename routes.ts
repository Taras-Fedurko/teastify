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

  dashboard: '/dashboard',

  project: {
    projects: 'project',
    project: '/project/:projectId',
    new: '/project-new',
    posts: '/project/:projectId/posts',
    postNew: '/project/:projectId/posts/new',
    settings: '/project/:projectId/settings',
    team: '/project/:projectId/settings/team',
    // billing: '/project/:projectId/settings/billing',
    // limits: '/project/:projectId/settings/limits',
  }
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
 export const DEFAULT_LOGIN_REDIRECT = routes.dashboard;
 
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

/**
 * Returm projest route
 * @param projectId 
 * @returns 
 */
export const getProjectRoute = (projectId: string): string => {
  return matchParams(routes.project.project, { projectId });
}

/**
 * Return project post route
 * @param projectId 
 * @returns 
 */
export const getProjectPostsRoute = (projectId: string) => {
  return matchParams(routes.project.posts, { projectId });
}

/**
 * Route to create new post
 * @param projectId 
 * @returns 
 */
export const getProjectPostsNewRoute = (projectId: string) => {
  return matchParams(routes.project.postNew, { projectId });
}

/**
* Returm projest setting route
 * @param projectId 
 * @returns 
 */
export const getProjectSettingRoute = (projectId: string): string => {
  return matchParams(routes.project.settings, { projectId });
}

/**
* Returm projest setting route
 * @param projectId 
 * @returns 
 */
export const getProjectTeamRoute = (projectId: string): string => {
  return matchParams(routes.project.team, { projectId });
}
