export function getBaseUrl() {
    if (typeof window !== "undefined") return ""; // use relative url in client
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return `http://localhost:${process.env.PORT || 3000}`;
}

export function getLandingUrl(subdomain: string) {
    const isDev = process.env.NODE_ENV === "development";
    const baseDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "landingbuilder.com";

    if (isDev) {
        // In local development, subdomains on localhost require specific setup.
        // For convenience, we'll use a local domain pattern or just localhost for now.
        // If the user uses lvh.me or similar, this works best.
        return `http://${subdomain}.localhost:3000`;
    }

    return `https://${subdomain}.${baseDomain}`;
}
