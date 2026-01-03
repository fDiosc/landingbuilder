import { NextRequest, NextResponse } from 'next/server';
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { landings, profiles } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

const VERCEL_AUTH_BEARER = process.env.VERCEL_AUTH_BEARER;
const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID;
const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID; // Optional, if using a team

export async function POST(req: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { domain, landingId } = await req.json();

        // 1. Verify user is PRO
        const profile = await db.query.profiles.findFirst({
            where: eq(profiles.id, userId),
        });

        if (profile?.subscriptionTier !== 'pro') {
            return NextResponse.json({ error: "Custom domains require a Pro plan" }, { status: 403 });
        }

        // 2. Verify landing ownership
        const landing = await db.query.landings.findFirst({
            where: and(eq(landings.id, landingId), eq(landings.userId, userId)),
        });

        if (!landing) return NextResponse.json({ error: "Landing not found" }, { status: 404 });

        // 3. Add domain to Vercel
        const vercelRes = await fetch(
            `https://api.vercel.com/v9/projects/${VERCEL_PROJECT_ID}/domains${VERCEL_TEAM_ID ? `?teamId=${VERCEL_TEAM_ID}` : ""}`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${VERCEL_AUTH_BEARER}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: domain }),
            }
        );

        const vercelData = await vercelRes.json();

        if (!vercelRes.ok && vercelData.error?.code !== "domain_already_in_use") {
            return NextResponse.json({ error: vercelData.error?.message || "Failed to add domain to Vercel" }, { status: 400 });
        }

        // 4. Update DB
        await db.update(landings)
            .set({ customDomain: domain })
            .where(eq(landings.id, landingId));

        revalidatePath("/dashboard/landings");

        return NextResponse.json({ success: true, domain });
    } catch (error: any) {
        console.error("[Domains API] Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { searchParams } = new URL(req.url);
        const domain = searchParams.get('domain');

        if (!domain) return NextResponse.json({ error: "Domain required" }, { status: 400 });

        // Fetch verification info from Vercel
        const [configRes, domainRes] = await Promise.all([
            fetch(`https://api.vercel.com/v6/domains/${domain}/config${VERCEL_TEAM_ID ? `?teamId=${VERCEL_TEAM_ID}` : ""}`, {
                headers: { Authorization: `Bearer ${VERCEL_AUTH_BEARER}` },
            }),
            fetch(`https://api.vercel.com/v9/projects/${VERCEL_PROJECT_ID}/domains/${domain}${VERCEL_TEAM_ID ? `?teamId=${VERCEL_TEAM_ID}` : ""}`, {
                headers: { Authorization: `Bearer ${VERCEL_AUTH_BEARER}` },
            }),
        ]);

        const config = await configRes.json();
        const domainData = await domainRes.json();

        return NextResponse.json({
            config,
            domain: domainData,
            verified: domainData.verified
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
