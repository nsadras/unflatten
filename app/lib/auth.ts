import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "./db";
import * as schema from "./schema";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            ...schema,
            user: schema.user,
            session: schema.session,
            account: schema.account,
            verification: schema.verification,
        }
    }),
    plugins: [nextCookies()],
    emailAndPassword: {
        enabled: true,
    },
    trustedOrigins: [
        process.env.NEXT_PUBLIC_BETTER_AUTH_URL!,
        process.env.VERCEL_URL!,
        "https://unflatten.vercel.app",
        "http://localhost:3000",
    ].filter(Boolean) as string[],
});
