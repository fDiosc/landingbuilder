import { NextResponse } from 'next/server';
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { landings } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET() {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const userLandings = await db.query.landings.findMany({
            where: eq(landings.userId, userId),
            orderBy: [desc(landings.createdAt)],
        });

        return NextResponse.json({ landings: userLandings });
    } catch (error) {
        console.error('Landings API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch landings' },
            { status: 500 }
        );
    }
}
