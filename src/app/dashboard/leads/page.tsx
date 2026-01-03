import { db } from "@/db";
import { leads, landings } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, desc, and, inArray } from "drizzle-orm";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Mail, Calendar, Search } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LeadsFilter } from "@/components/dashboard/LeadsFilter";
import { LeadsExportButton } from "@/components/dashboard/LeadsExportButton";

export default async function LeadsPage({
    searchParams
}: {
    searchParams: Promise<{ landingId?: string }>
}) {
    const { userId } = await auth();
    if (!userId) redirect("/sign-in");

    const params = await searchParams;
    const selectedLandingId = params.landingId;

    // 1. Fetch user landings for the filter
    const userLandings = await db.query.landings.findMany({
        where: eq(landings.userId, userId),
        orderBy: [desc(landings.createdAt)],
    });

    if (userLandings.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
                <div className="p-4 bg-neutral-100 rounded-full">
                    <Search className="h-10 w-10 text-neutral-400" />
                </div>
                <h2 className="text-xl font-bold text-neutral-900">No projects yet</h2>
                <p className="text-neutral-500 max-w-sm">
                    Create a landing page first to start capturing leads.
                </p>
                <Link href="/dashboard/landings">
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold">
                        Go to My Landings
                    </button>
                </Link>
            </div>
        );
    }

    // 2. Build leads query
    let leadQuery;
    const landingIds = userLandings.map(l => l.id);

    if (selectedLandingId && landingIds.includes(selectedLandingId as any)) {
        leadQuery = db.query.leads.findMany({
            where: eq(leads.landingId, selectedLandingId as any),
            orderBy: [desc(leads.createdAt)],
            with: {
                landing: true
            }
        });
    } else {
        leadQuery = db.query.leads.findMany({
            where: inArray(leads.landingId, landingIds),
            orderBy: [desc(leads.createdAt)],
            // with: {
            //     landing: true
            // }
        });
    }

    // Since I don't know if relationships are set up in schema.ts, 
    // I'll fetch leads and landings separately if needed, or 
    // manually join. Let's check schema.ts relation setup.
    // Looking back at schema.ts, there are no explicit relations defined with `relations` helper.
    // I'll fetch leads and then map the landing name.

    const allLeads = await leadQuery;

    // Map landing names for display
    const landingMap = new Map(userLandings.map(l => [l.id, l.name]));

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Leads</h1>
                    <p className="text-neutral-500">View and manage people who signed up on your landings.</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                    <LeadsFilter landings={userLandings.map(l => ({ id: l.id, name: l.name }))} />
                    <LeadsExportButton
                        leads={allLeads}
                        projectName={selectedLandingId ? (landingMap.get(selectedLandingId as any) || "project") : "all-projects"}
                        landingNames={Object.fromEntries(landingMap)}
                    />
                </div>
            </div>

            <div className="rounded-xl border border-neutral-100 bg-white shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-neutral-50/50 hover:bg-neutral-50/50">
                            <TableHead>Contact</TableHead>
                            <TableHead>Project</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Registered At</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {allLeads.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-48 text-center text-neutral-500">
                                    <div className="flex flex-col items-center gap-2">
                                        <Mail className="h-8 w-8 opacity-20" />
                                        <p>No leads found for this selection.</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            allLeads.map((lead) => (
                                <TableRow key={lead.id} className="hover:bg-neutral-50/50 transition-colors">
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-neutral-900">{lead.email}</span>
                                            {lead.name && <span className="text-xs text-neutral-500">{lead.name}</span>}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="font-medium bg-neutral-50 border-neutral-200">
                                            {landingMap.get(lead.landingId) || "Deleted Project"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            className={lead.contacted ? "bg-blue-100 text-blue-700 hover:bg-blue-100" : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"}
                                        >
                                            {lead.contacted ? "Contacted" : "New"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right text-neutral-500 text-sm">
                                        <div className="flex items-center justify-end gap-1.5 font-medium">
                                            {new Date(lead.createdAt).toLocaleDateString()}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
