"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

export function LeadsFilter({ landings }: { landings: { id: string, name: string }[] }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedLandingId = searchParams.get("landingId") || "all";

    const handleChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value === "all") {
            params.delete("landingId");
        } else {
            params.set("landingId", value);
        }
        router.push(`/dashboard/leads?${params.toString()}`);
    };

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-neutral-500">Filter by Project:</span>
            <Select
                value={selectedLandingId}
                onValueChange={handleChange}
            >
                <SelectTrigger className="w-[200px] bg-white">
                    <SelectValue placeholder="All Projects" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Projects</SelectItem>
                    {landings.map((l) => (
                        <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
