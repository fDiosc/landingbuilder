"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Topbar() {
    const { user } = useUser();

    return (
        <header className="flex h-16 items-center justify-between border-b border-neutral-100 bg-white px-6">
            <div className="flex w-full max-w-md items-center gap-2">
                <div className="relative w-full">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-400" />
                    <Input
                        placeholder="Search landings..."
                        className="w-full bg-neutral-50 pl-9 border-none focus-visible:ring-1 focus-visible:ring-blue-100"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="relative rounded-full p-2 text-neutral-400 hover:bg-neutral-50 hover:text-neutral-900 transition-colors">
                    < Bell className="h-5 w-5" />
                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 border-2 border-white" />
                </button>

                <div className="h-6 w-[1px] bg-neutral-100 mx-2" />

                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-neutral-900">{user?.fullName}</p>
                        <p className="text-xs text-neutral-400">{user?.primaryEmailAddress?.emailAddress}</p>
                    </div>
                    <UserButton
                        afterSignOutUrl="/"
                        appearance={{
                            elements: {
                                userButtonAvatarBox: "h-9 w-9 border-2 border-white shadow-sm"
                            }
                        }}
                    />
                </div>
            </div>
        </header>
    );
}
