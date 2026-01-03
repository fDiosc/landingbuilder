"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { completeOnboarding } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket, Target, User as UserIcon } from "lucide-react";

export default function OnboardingPage() {
    const { user, isLoaded } = useUser();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    if (!isLoaded) return null;

    return (
        <div className="flex min-h-screen items-center justify-center bg-neutral-50 p-4">
            <Card className="w-full max-w-lg shadow-xl border-neutral-200 overflow-hidden">
                <div className="h-2 w-full bg-neutral-100">
                    <div
                        className="h-full bg-blue-600 transition-all duration-500 ease-in-out"
                        style={{ width: `${(step / 3) * 100}%` }}
                    />
                </div>

                <form action={async (formData) => {
                    setLoading(true);
                    await completeOnboarding(formData);
                }}>
                    {/* Step 1: Welcome */}
                    <div className={step !== 1 ? "hidden" : "animate-in fade-in slide-in-from-bottom-4 duration-500"}>
                        <CardHeader className="text-center pt-8">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                <Rocket className="h-8 w-8" />
                            </div>
                            <CardTitle className="text-2xl font-bold text-neutral-900">
                                Welcome to Landing Builder! 👋
                            </CardTitle>
                            <CardDescription className="text-lg">
                                In 3 steps, you'll have your first landing page live.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-center pb-8">
                            <Button type="button" size="lg" onClick={() => setStep(2)} className="px-8 bg-blue-600 hover:bg-blue-700">
                                Start Now
                            </Button>
                        </CardContent>
                    </div>

                    {/* Step 2: Profile Setup */}
                    <div className={step !== 2 ? "hidden" : "animate-in fade-in slide-in-from-right-4 duration-500"}>
                        <CardHeader>
                            <div className="mb-2 flex items-center gap-2 text-blue-600 font-medium">
                                <UserIcon className="h-4 w-4" /> Step 2 of 3
                            </div>
                            <CardTitle className="text-2xl font-bold">Profile Setup</CardTitle>
                            <CardDescription>Tell us a bit about yourself.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-neutral-700">Your full name</label>
                                <Input
                                    name="fullName"
                                    defaultValue={user?.fullName || ""}
                                    placeholder="e.g. John Doe"
                                    required
                                    className="border-neutral-200 focus:ring-blue-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-neutral-700">What are you building?</label>
                                <select
                                    name="projectType"
                                    className="flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                                    required
                                >
                                    <option value="micro-saas">Micro-SaaS</option>
                                    <option value="infoproduct">Infoproduct</option>
                                    <option value="consultancy">Consultancy</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t border-neutral-100 pt-6">
                            <Button type="button" variant="ghost" onClick={() => setStep(1)}>Back</Button>
                            <Button type="button" onClick={() => setStep(3)} className="bg-blue-600 hover:bg-blue-700">Next</Button>
                        </CardFooter>
                    </div>

                    {/* Step 3: Goals */}
                    <div className={step !== 3 ? "hidden" : "animate-in fade-in slide-in-from-right-4 duration-500"}>
                        <CardHeader>
                            <div className="mb-2 flex items-center gap-2 text-blue-600 font-medium">
                                <Target className="h-4 w-4" /> Step 3 of 3
                            </div>
                            <CardTitle className="text-2xl font-bold">What is your goal?</CardTitle>
                            <CardDescription>This helps us suggest the best template.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 gap-3">
                                <label className="flex items-center gap-3 rounded-lg border border-neutral-200 p-4 hover:bg-neutral-50 cursor-pointer transition-colors has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50">
                                    <input type="radio" name="goal" value="leads" className="h-4 w-4 text-blue-600" defaultChecked />
                                    <div>
                                        <div className="font-medium">Capture Leads</div>
                                        <div className="text-xs text-neutral-500">Create a waitlist for your product.</div>
                                    </div>
                                </label>
                                <label className="flex items-center gap-3 rounded-lg border border-neutral-200 p-4 hover:bg-neutral-50 cursor-pointer transition-colors has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50">
                                    <input type="radio" name="goal" value="presale" className="h-4 w-4 text-blue-600" />
                                    <div>
                                        <div className="font-medium">Pre-sale</div>
                                        <div className="text-xs text-neutral-500">Validate demand with real payments.</div>
                                    </div>
                                </label>
                                <label className="flex items-center gap-3 rounded-lg border border-neutral-200 p-4 hover:bg-neutral-50 cursor-pointer transition-colors has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50">
                                    <input type="radio" name="goal" value="fake-door" className="h-4 w-4 text-blue-600" />
                                    <div>
                                        <div className="font-medium">Fake Door Test</div>
                                        <div className="text-xs text-neutral-500">Test interest without having the product ready.</div>
                                    </div>
                                </label>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t border-neutral-100 pt-6">
                            <Button type="button" variant="ghost" onClick={() => setStep(2)}>Back</Button>
                            <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 min-w-[140px]">
                                {loading ? "Finishing..." : "Complete Setup 🚀"}
                            </Button>
                        </CardFooter>
                    </div>
                </form>
            </Card>
        </div>
    );
}
