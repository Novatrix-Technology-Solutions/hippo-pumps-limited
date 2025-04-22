const Ziggy = {
    url: import.meta.env.VITE_APP_URL || 'http://localhost',
    port: null,
    defaults: {},
    routes: {
        sanctum.csrf-cookie: {
            uri: "sanctum/csrf-cookie",
            methods: ["GET", "HEAD"]
        },
        home: {
            uri: "/",
            methods: ["GET", "HEAD"]
        },
        find-us: {
            uri: "find-us",
            methods: ["GET", "HEAD"]
        },
        meet-the-team: {
            uri: "meet-the-team",
            methods: ["GET", "HEAD"]
        },
        the-company: {
            uri: "the-company",
            methods: ["GET", "HEAD"]
        },
        news.index: {
            uri: "news",
            methods: ["GET", "HEAD"]
        },
        news.show: {
            uri: "news/{news}",
            methods: ["GET", "HEAD"],
            parameters: ["news"],
            bindings: {
                news: "slug"
            }
        },
        pump-solutions.index: {
            uri: "dashboard/pump-solutions",
            methods: ["GET", "HEAD"]
        },
        pump-solutions.show: {
            uri: "pump-solutions/{pumpSolution}",
            methods: ["GET", "HEAD"],
            parameters: ["pumpSolution"],
            bindings: {
                pumpSolution: "slug"
            }
        },
        profile.edit: {
            uri: "profile",
            methods: ["GET", "HEAD"]
        },
        profile.update: {
            uri: "profile",
            methods: ["PATCH"]
        },
        profile.destroy: {
            uri: "profile",
            methods: ["DELETE"]
        },
        news.create: {
            uri: "admin/news/create",
            methods: ["GET", "HEAD"]
        },
        news.store: {
            uri: "admin/news",
            methods: ["POST"]
        },
        news.edit: {
            uri: "admin/news/{news}/edit",
            methods: ["GET", "HEAD"],
            parameters: ["news"],
            bindings: {
                news: "id"
            }
        },
        news.update: {
            uri: "admin/news/{news}",
            methods: ["PUT"],
            parameters: ["news"],
            bindings: {
                news: "id"
            }
        },
        news.destroy: {
            uri: "admin/news/{news}",
            methods: ["DELETE"],
            parameters: ["news"],
            bindings: {
                news: "id"
            }
        },
        pump-solutions.create: {
            uri: "dashboard/pump-solutions/create",
            methods: ["GET", "HEAD"]
        },
        pump-solutions.store: {
            uri: "dashboard/pump-solutions",
            methods: ["POST"]
        },
        pump-solutions.edit: {
            uri: "dashboard/pump-solutions/{pump_solution}/edit",
            methods: ["GET", "HEAD"],
            parameters: ["pump_solution"]
        },
        pump-solutions.update: {
            uri: "dashboard/pump-solutions/{pump_solution}",
            methods: ["PUT", "PATCH"],
            parameters: ["pump_solution"]
        },
        pump-solutions.destroy: {
            uri: "dashboard/pump-solutions/{pump_solution}",
            methods: ["DELETE"],
            parameters: ["pump_solution"]
        },
        register: {
            uri: "register",
            methods: ["GET", "HEAD"]
        },
        login: {
            uri: "login",
            methods: ["GET", "HEAD"]
        },
        password.request: {
            uri: "forgot-password",
            methods: ["GET", "HEAD"]
        },
        password.email: {
            uri: "forgot-password",
            methods: ["POST"]
        },
        password.reset: {
            uri: "reset-password/{token}",
            methods: ["GET", "HEAD"],
            parameters: ["token"]
        },
        password.store: {
            uri: "reset-password",
            methods: ["POST"]
        },
        verification.notice: {
            uri: "verify-email",
            methods: ["GET", "HEAD"]
        },
        verification.verify: {
            uri: "verify-email/{id}/{hash}",
            methods: ["GET", "HEAD"],
            parameters: ["id", "hash"]
        },
        verification.send: {
            uri: "email/verification-notification",
            methods: ["POST"]
        },
        password.confirm: {
            uri: "confirm-password",
            methods: ["GET", "HEAD"]
        },
        password.update: {
            uri: "password",
            methods: ["PUT"]
        },
        logout: {
            uri: "logout",
            methods: ["POST"]
        },
        storage.local: {
            uri: "storage/{path}",
            methods: ["GET", "HEAD"],
            wheres: {
                path: ".*"
            },
            parameters: ["path"]
        }
    }
};

if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
    Object.assign(Ziggy.routes, window.Ziggy.routes);
}

export { Ziggy };
