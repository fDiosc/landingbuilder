import { NextRequest, NextResponse } from 'next/server';
import { getLandingAnalytics, getLandingEvents } from '@/lib/analytics/ga4';
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { landings, leads } from "@/db/schema";
import { eq, and, gte, lte, count } from "drizzle-orm";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ landingId: string }> }
) {
    try {
        const { landingId } = await params;
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Verify ownership
        const landing = await db.query.landings.findFirst({
            where: and(
                eq(landings.id, landingId),
                eq(landings.userId, userId)
            ),
        });

        if (!landing) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const searchParams = req.nextUrl.searchParams;
        const startDate = searchParams.get('startDate') || '7daysAgo';
        const endDate = searchParams.get('endDate') || 'today';

        // Fetch GA4 data
        console.log(`[Analytics API] Fetching GA4 data for landing: ${landingId}`);
        const [analytics, leadCaptureEvents, ctaClickEvents] = await Promise.all([
            getLandingAnalytics(landingId, startDate, endDate),
            getLandingEvents(landingId, 'lead_capture', startDate, endDate),
            getLandingEvents(landingId, 'cta_click', startDate, endDate),
        ]);
        console.log(`[Analytics API] GA4 data fetched successfully`);

        // Fetch leads from DB (Source of Truth)
        // We'll calculate a simple date for the count since the DB might not match GA4's strings exactly
        // For now, let's just use the total count to keep it simple for the MVP
        const [leadsCountRes] = await db
            .select({ value: count() })
            .from(leads)
            .where(eq(leads.landingId, landingId));

        return NextResponse.json({
            analytics,
            events: {
                leadCaptures: leadCaptureEvents.totalCount,
                ctaClicks: ctaClickEvents.totalCount,
            },
            leads: {
                captured: leadsCountRes.value || 0,
            },
            conversionRate: analytics.uniqueVisitors > 0
                ? ((leadsCountRes.value || 0) / analytics.uniqueVisitors * 100).toFixed(2)
                : '0.00',
        });
    } catch (error: any) {
        console.error('[Analytics API] Error:', error.message, error.stack);
        return NextResponse.json(
            { error: 'Failed to fetch analytics', details: error.message },
            { status: 500 }
        );
    }
}
