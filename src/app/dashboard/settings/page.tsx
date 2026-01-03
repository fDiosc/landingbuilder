"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Settings</h1>
                <p className="text-neutral-500">Manage your account and platform preferences.</p>
            </div>

            <div className="grid gap-6">
                <Card className="shadow-sm border-neutral-100">
                    <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>Update your personal details.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" disabled placeholder="felipe@example.com" value="user@example.com" />
                        </div>
                        <Separator />
                        <div className="flex justify-end">
                            <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-sm border-red-100 bg-red-50/30">
                    <CardHeader>
                        <CardTitle className="text-red-900">Danger Zone</CardTitle>
                        <CardDescription className="text-red-700">Irreversible actions for your account.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="destructive" className="bg-red-600 hover:bg-red-700">Delete Account</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
