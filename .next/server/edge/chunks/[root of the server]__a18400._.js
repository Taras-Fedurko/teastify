(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/[root of the server]__a18400._.js", {

"[externals]/node:async_hooks [external] (node:async_hooks, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const mod = __turbopack_external_require__("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}}),
"[externals]/node:buffer [external] (node:buffer, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const mod = __turbopack_external_require__("node:buffer", () => require("node:buffer"));

module.exports = mod;
}}),
"[project]/modules/auth/auth.schema.ts [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// @verified
__turbopack_esm__({
    "ForgotPasswordSchema": (()=>ForgotPasswordSchema),
    "LoginSchema": (()=>LoginSchema),
    "MagicSignInSchema": (()=>MagicSignInSchema),
    "ResetPasswordSchema": (()=>ResetPasswordSchema),
    "SignupSchema": (()=>SignupSchema)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/zod/lib/index.mjs [middleware] (ecmascript)");
;
const emailSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__.string().email({
    message: 'Please enter a valid email address'
});
const passwordSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__.string().min(7, {
    message: 'Password is required'
});
const ForgotPasswordSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__.object({
    email: emailSchema
});
const ResetPasswordSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__.object({
    password: passwordSchema,
    confirmPassword: passwordSchema
}).refine((data)=>data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: [
        'confirmPassword'
    ]
});
const LoginSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__.object({
    email: emailSchema,
    password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__.string().min(1, {
        message: 'Password is required'
    })
});
const SignupSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__.object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__.string(),
    email: emailSchema,
    password: passwordSchema
});
const MagicSignInSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__.object({
    email: emailSchema
});
}}),
"[project]/lib/prisma.ts [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$2f$default$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@prisma/client/default.js [middleware] (ecmascript)");
;
let prisma;
if ("TURBOPACK compile-time falsy", 0) {
    "TURBOPACK unreachable";
} else {
    if (!global.prisma) {
        global.prisma = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$2f$default$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["PrismaClient"]();
    }
    prisma = global.prisma;
}
const __TURBOPACK__default__export__ = prisma;
}}),
"[project]/modules/auth/data/user.ts [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/lib/prisma.ts [middleware] (ecmascript)");
;
class UserRepository {
    async getUserByEmail(email) {
        try {
            return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["default"].user.findUnique({
                where: {
                    email
                }
            });
        } catch (error) {
            console.error('Error fetching user by email:', error);
            throw new Error('Could not fetch user by email');
        }
    }
    async getUserById(id) {
        try {
            return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["default"].user.findUnique({
                where: {
                    id
                }
            });
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            throw new Error('Could not fetch user by ID');
        }
    }
    async verifyUserEmail(id) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["default"].user.update({
            where: {
                id
            },
            data: {
                emailVerified: new Date()
            }
        });
    }
}
const userRepository = new UserRepository();
const __TURBOPACK__default__export__ = userRepository;
}}),
"[project]/modules/auth/auth.config.ts [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// @verified
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$providers$2f$credentials$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/next-auth/providers/credentials.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$dist$2f$bcrypt$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/bcryptjs/dist/bcrypt.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$providers$2f$google$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/next-auth/providers/google.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$modules$2f$auth$2f$auth$2e$schema$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/modules/auth/auth.schema.ts [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$modules$2f$auth$2f$data$2f$user$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/modules/auth/data/user.ts [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f40$auth$2f$core$2f$providers$2f$credentials$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next-auth/node_modules/@auth/core/providers/credentials.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f40$auth$2f$core$2f$providers$2f$google$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next-auth/node_modules/@auth/core/providers/google.js [middleware] (ecmascript)");
;
;
;
;
;
const __TURBOPACK__default__export__ = {
    trustHost: true,
    providers: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f40$auth$2f$core$2f$providers$2f$credentials$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])({
            credentials: {
                email: {
                    label: "Email",
                    type: "email"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            async authorize (credentials) {
                const validate = await __TURBOPACK__imported__module__$5b$project$5d2f$modules$2f$auth$2f$auth$2e$schema$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["LoginSchema"].parseAsync(credentials);
                if (!validate) {
                    return null;
                }
                const { email, password } = validate;
                const user = await __TURBOPACK__imported__module__$5b$project$5d2f$modules$2f$auth$2f$data$2f$user$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["default"].getUserByEmail(email);
                if (!user || !user.password) {
                    return null;
                }
                const matched = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$dist$2f$bcrypt$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"].compare(password, user.password);
                if (matched) {
                    return user;
                }
                return null;
            }
        }),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f40$auth$2f$core$2f$providers$2f$google$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])({
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            clientId: process.env.GOOGLE_CLIENT_ID
        })
    ]
};
}}),
"[project]/routes.ts [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
/**
 * Map of all routes
 * @type {Record<string, string | Record<string, string>>}
 */ __turbopack_esm__({
    "DEFAULT_LOGIN_REDIRECT": (()=>DEFAULT_LOGIN_REDIRECT),
    "apiAuthPrefix": (()=>apiAuthPrefix),
    "authRoutes": (()=>authRoutes),
    "getProjectPostsNewRoute": (()=>getProjectPostsNewRoute),
    "getProjectPostsRoute": (()=>getProjectPostsRoute),
    "getProjectRoute": (()=>getProjectRoute),
    "getProjectSettingRoute": (()=>getProjectSettingRoute),
    "getProjectTeamRoute": (()=>getProjectTeamRoute),
    "publicRoutes": (()=>publicRoutes),
    "routes": (()=>routes)
});
const routes = {
    landing: '/',
    auth: {
        signIn: '/sign-in',
        signUp: '/sign-up',
        signOut: '/sign-out',
        forgorPassword: '/forgot-password',
        newPassword: '/new-password',
        emailVerify: "/email-verify",
        verifyRequest: "/verify-request",
        authError: "/auth-error"
    },
    dashboard: '/dashboard',
    project: {
        projects: 'project',
        project: '/project/:projectId',
        new: '/project-new',
        posts: '/project/:projectId/posts',
        postNew: '/project/:projectId/posts/new',
        settings: '/project/:projectId/settings',
        team: '/project/:projectId/settings/team'
    }
};
const publicRoutes = [
    routes.landing
];
const authRoutes = [
    routes.auth.signIn,
    routes.auth.signUp,
    routes.auth.forgorPassword,
    routes.auth.newPassword,
    routes.auth.emailVerify,
    routes.auth.verifyRequest,
    routes.auth.authError
];
const apiAuthPrefix = '/api/auth';
const DEFAULT_LOGIN_REDIRECT = routes.dashboard;
/**
 * 
 * @param route helper to create routes mased on match params 
 * @param params 
 * @returns route
 */ const matchParams = (route, params)=>{
    return Object.keys(params).reduce((path, key)=>{
        const regex = new RegExp(`:${key}`, 'g');
        return path.replace(regex, params[key]);
    }, route);
};
const getProjectRoute = (projectId)=>{
    return matchParams(routes.project.project, {
        projectId
    });
};
const getProjectPostsRoute = (projectId)=>{
    return matchParams(routes.project.posts, {
        projectId
    });
};
const getProjectPostsNewRoute = (projectId)=>{
    return matchParams(routes.project.postNew, {
        projectId
    });
};
const getProjectSettingRoute = (projectId)=>{
    return matchParams(routes.project.settings, {
        projectId
    });
};
const getProjectTeamRoute = (projectId)=>{
    return matchParams(routes.project.team, {
        projectId
    });
};
}}),
"[project]/middleware.ts [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// @verified
__turbopack_esm__({
    "config": (()=>config),
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/next-auth/index.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$modules$2f$auth$2f$auth$2e$config$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/modules/auth/auth.config.ts [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$routes$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/routes.ts [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/next-auth/index.js [middleware] (ecmascript) <locals>");
;
;
;
const { auth } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$modules$2f$auth$2f$auth$2e$config$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["default"]);
const __TURBOPACK__default__export__ = auth((req)=>{
    const isLoggedIn = !!req.auth;
    const { nextUrl } = req;
    const isApiAuth = nextUrl.pathname.startsWith(__TURBOPACK__imported__module__$5b$project$5d2f$routes$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["apiAuthPrefix"]);
    const isPublicRoute = __TURBOPACK__imported__module__$5b$project$5d2f$routes$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["publicRoutes"].includes(nextUrl.pathname);
    const isAuthRoute = __TURBOPACK__imported__module__$5b$project$5d2f$routes$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["authRoutes"].includes(nextUrl.pathname);
    if (isApiAuth) {
        return;
    }
    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(__TURBOPACK__imported__module__$5b$project$5d2f$routes$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["DEFAULT_LOGIN_REDIRECT"], nextUrl));
        }
        return;
    }
    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL(__TURBOPACK__imported__module__$5b$project$5d2f$routes$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["routes"].auth.signIn, nextUrl));
    }
    return;
});
const config = {
    matcher: [
        "/((?!.*\\..*|_next).*)",
        "/",
        "/(api|trpc)(.*)"
    ]
};
}}),
}]);

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__a18400._.js.map