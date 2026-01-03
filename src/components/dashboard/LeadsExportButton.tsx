"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface Lead {
    email: string;
    name?: string | null;
    createdAt: Date;
    landingId: string;
}

export function LeadsExportButton({
    leads,
    projectName,
    landingNames = {}
}: {
    leads: Lead[],
    projectName: string,
    landingNames?: Record<string, string>
}) {
    const handleExport = () => {
        if (leads.length === 0) return;

        // CSV Header
        const headers = ["Email", "Name", "Registered At", "Project"];

        // CSV Rows
        const rows = leads.map(lead => [
            lead.email,
            lead.name || "",
            new Date(lead.createdAt).toISOString(),
            landingNames[lead.landingId] || lead.landingId
        ]);

        // Combine to string
        const csvContent = [
            headers.join(","),
            ...rows.map(row => row.map(val => `"${val}"`).join(","))
        ].join("\n");

        // Create blob and download
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `leads-${projectName.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Button
            onClick={handleExport}
            disabled={leads.length === 0}
            variant="outline"
            className="gap-2 bg-white border-neutral-200 text-neutral-700 font-bold hover:bg-neutral-50"
        >
            <Download className="h-4 w-4" />
            Extract Emails (CSV)
        </Button>
    );
}
