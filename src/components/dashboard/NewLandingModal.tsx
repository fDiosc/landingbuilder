"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createLanding } from "@/app/dashboard/landings/actions";
import { generateLandingMagic } from "@/app/dashboard/landings/ai-actions";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Loader2, Wand2, Layout } from "lucide-react";
import { toast } from "sonner";

export function NewLandingModal({ children }: { children?: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState<"template" | "ai">("ai");
    const router = useRouter();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.currentTarget);

        try {
            const result = mode === "ai"
                ? await generateLandingMagic(formData)
                : await createLanding(formData);

            if (result.success) {
                toast.success(mode === "ai" ? "Magic page generated! 🪄" : "Landing page created!");
                setOpen(false);
                router.push(`/editor/${result.id}`);
            } else {
                toast.error(result.error || "Something went wrong");
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children || (
                    <Button className="bg-blue-600 hover:bg-blue-700 gap-2 font-semibold">
                        <PlusCircle className="h-4 w-4" /> New Landing
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            {mode === "ai" ? <Wand2 className="h-5 w-5 text-purple-500" /> : <Layout className="h-5 w-5 text-blue-500" />}
                            Create New Landing
                        </DialogTitle>
                        <DialogDescription>
                            How would you like to build your new project?
                        </DialogDescription>
                    </DialogHeader>

                    <Tabs defaultValue="ai" className="w-full mt-4" onValueChange={(v) => setMode(v as any)}>
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="ai" className="gap-2">
                                <Wand2 className="h-4 w-4" /> AI Magic
                            </TabsTrigger>
                            <TabsTrigger value="template" className="gap-2">
                                <Layout className="h-4 w-4" /> Template
                            </TabsTrigger>
                        </TabsList>

                        <div className="grid gap-4 py-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Project Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="e.g. My Awesome SaaS"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="subdomain">Subdomain</Label>
                                <div className="flex items-center gap-2">
                                    <Input
                                        id="subdomain"
                                        name="subdomain"
                                        placeholder="my-saas"
                                        required
                                    />
                                    <span className="text-sm text-neutral-500 font-medium">.localhost:3000</span>
                                </div>
                            </div>

                            <TabsContent value="ai" className="mt-0 space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="description">Business Description</Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        className="h-32 resize-none"
                                        placeholder="Explain what your product does, who it's for, and what makes it special. We'll generate the copy and layout for you."
                                        required={mode === "ai"}
                                    />
                                </div>
                            </TabsContent>

                            <TabsContent value="template" className="mt-0">
                                <div className="grid gap-2">
                                    <Label htmlFor="templateId">Select Template</Label>
                                    <Select name="templateId" defaultValue="saas-classic">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a template" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="saas-classic">SaaS Classic</SelectItem>
                                            <SelectItem value="waitlist">Simple Waitlist (V0)</SelectItem>
                                            <SelectItem value="presale">Product Presale</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </TabsContent>
                        </div>
                    </Tabs>

                    <DialogFooter>
                        <Button
                            type="submit"
                            disabled={loading}
                            className={`w-full font-bold transition-all ${mode === "ai"
                                    ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-200"
                                    : "bg-blue-600 hover:bg-blue-700"
                                }`}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {mode === "ai" ? "Generating Magic..." : "Creating..."}
                                </>
                            ) : (
                                mode === "ai" ? "✨ Generate with Magic" : "Create & Open Editor"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
