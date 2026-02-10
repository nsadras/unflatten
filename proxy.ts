import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";

export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        // For API routes, usually we want 401, but proxy/middleware redirects.
        // Since this is an API route, a redirect to /sign-in might not be what the fetcher expects?
        // But the user's requirement is "Auth Protection" and "The UI will optionally show a login prompt".
        // If the browser (fetch) hits this, a redirect will likely result in an opaque response or CORS issue if not handled?
        // But for /api/generate specifically, it's called by the frontend.
        // Let's return 401 for API routes instead of redirect?
        // BetterAuth examples show redirect.
        // Let's stick to redirect for now, or maybe return JSON?
        // The user docs example returns redirect.
        // But that's for page protection.
        // "We recommend handling auth checks in each page/route".
        // "In Next.js proxy/middleware, it's recommended to only check for the existence of a session cookie to handle redirection. To avoid blocking requests by making API or database calls."
        // Wait, the user docs say: Next.js 16+ (Proxy) "You can use the Node.js runtime for full session validation with database checks".
        // And the example shows `if(!session) return NextResponse.redirect(...)`.

        // However, invalidating an API call with a redirect to HTML login page usually breaks the client JSON parser.
        // I will check if the request is for API.
        if (request.nextUrl.pathname.startsWith("/api/")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/api/generate"], // Only protect the generate endpoint
};
