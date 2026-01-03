"use server";

import { db } from "@/db";
import { profiles } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function completeOnboarding(formData: FormData) {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const fullName = formData.get("fullName") as string;
    const projectType = formData.get("projectType") as string;
    const goal = formData.get("goal") as string;

    if (!fullName || !projectType) {
        throw new Error("Missing required profile information");
    }

    await db.insert(profiles)
        .values({
            id: userId,
            fullName,
            subscriptionTier: "free",
        })
        .onConflictDoUpdate({
            target: profiles.id,
            set: {
                fullName,
                subscriptionTier: "free",
                updatedAt: new Date(),
            },
        });

    // For the MVP, we'll just update the profile and redirect to dashboard.
    // Note: We could add projectType and goal to the profiles table or a meta table if needed.

    redirect("/dashboard");
}
