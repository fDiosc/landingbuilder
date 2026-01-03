"use server";

import { db } from "@/db";
import { leads } from "@/db/schema";

export async function submitLead(landingId: string, email: string, name?: string, metadata?: any) {
    if (!landingId || !email) {
        throw new Error("Missing required fields");
    }

    try {
        const [newLead] = await db.insert(leads).values({
            landingId,
            email,
            name,
            metadata,
        }).returning();

        return { success: true, id: newLead.id };
    } catch (error) {
        console.error("Error submitting lead:", error);
        return { success: false, error: "Failed to submit lead" };
    }
}
