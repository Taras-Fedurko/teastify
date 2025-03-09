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

  recipes: {
    list: '/recipes',
    detail: '/recipe/:id',
    categories: '/categories',
    categoryDetail: '/category/:name',
  },

  mealPlanner: {
    root: '/meal-planner',
    generate: '/meal-planner/generate',
    shoppingList: '/shopping-list',
    shoppingListExport: '/shopping-list/export',
  },

  nutrition: {
    journal: '/nutrition-journal',
    analytics: '/nutrition-journal/analytics',
    recommendations: '/recommendations',
    tips: '/recommendations/tips',
  },

  community: {
    root: '/community',
    feedback: '/feedback',
  },

  profile: {
    root: '/profile',
  },

  my: {
    root: '/my',
    recipes: '/my/recipes',
    favorites: '/my/favorites',
    mealPlans: '/my/meal-plans',
    nutritionHistory: '/my/nutrition-history',
  },
};

/**
 * Routes accessible to the public are listed here in an array 
 * @type {string[]}
 */
export const publicRoutes: string[] = [
  routes.landing,
  routes.recipes.list,
  routes.recipes.detail,
  routes.recipes.categories,
  routes.recipes.categoryDetail,
  routes.community.root,
  routes.community.feedback,
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
 * Protected routes that require authentication (profile and meal planner)
 * @type {string[]}
 */
export const protectedRoutes: string[] = [
  routes.profile.root,
  routes.my.root,
  routes.my.recipes,
  routes.my.favorites,
  routes.my.mealPlans,
  routes.my.nutritionHistory,
  routes.mealPlanner.root,
  routes.mealPlanner.generate,
  routes.mealPlanner.shoppingList,
  routes.mealPlanner.shoppingListExport,
  routes.nutrition.journal,
  routes.nutrition.analytics,
  routes.nutrition.recommendations,
  routes.nutrition.tips,
];
 
/**
 * Routes start with the api/auth are used for api auth purpose 
 * @type {string} 
 */
export const apiAuthPrefix: string = '/api/auth';

/**
 * API route prefixes for different features
 * @type {Record<string, string>}
 */
export const apiPrefixes = {
  recipes: '/api/recipes',
  mealPlanner: '/api/meal-planner',
  nutrition: '/api/nutrition',
  community: '/api/community',
  profile: '/api/profile',
};

/**
 * The default route to redirect to after login
 */
export const DEFAULT_LOGIN_REDIRECT = routes.profile.root;
 
/**
 * Helper to create routes based on match params 
 * @param route route pattern with params
 * @param params parameters to replace in the route
 * @returns {string} resolved route
 */
export const matchParams = (route: string, params: Record<string, string>): string => {
  return Object.keys(params).reduce((path, key) => {
    const regex = new RegExp(`:${key}`, 'g');
    return path.replace(regex, params[key]);
  }, route);
};
