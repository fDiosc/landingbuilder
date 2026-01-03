import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/api/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
    const url = req.nextUrl;
    const hostname = req.headers.get("host") || "localhost:3000";

    // Define the root domain
    const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";

    // Extract subdomain
    const subdomain = hostname.endsWith(rootDomain)
        ? hostname.replace(`.${rootDomain}`, "")
        : null;

    console.log(`[Proxy] Host: ${hostname}, Subdomain: ${subdomain}, Path: ${url.pathname}`);

    // 1. Handle Subdomain Routing (Public Landings)
    if (subdomain && subdomain !== rootDomain && hostname !== rootDomain) {
        const rewriteUrl = new URL(`/public/${subdomain}${url.pathname}`, req.url);
        console.log(`[Proxy] Rewriting to: ${rewriteUrl.pathname}`);
        return NextResponse.rewrite(rewriteUrl);
    }

    // 2. Handle Protected Routes (Dashboard)
    if (isProtectedRoute(req)) {
        await auth.protect();
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
