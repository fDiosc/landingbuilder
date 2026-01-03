"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Globe, CheckCircle2, AlertCircle, Copy, RefreshCw, ExternalLink, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function DomainSettings({ landingId, initialDomain }: { landingId: string; initialDomain?: string | null }) {
    const [domain, setDomain] = useState(initialDomain || "");
    const [loading, setLoading] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [status, setStatus] = useState<any>(null);

    const checkStatus = async (d: string) => {
        setVerifying(true);
        try {
            const res = await fetch(`/api/domains?domain=${d}`);
            const data = await res.json();
            setStatus(data);
        } catch (error) {
            console.error("Status check error:", error);
        } finally {
            setVerifying(false);
        }
    };

    useEffect(() => {
        if (initialDomain) {
            checkStatus(initialDomain);
        }
    }, [initialDomain]);

    const handleAddDomain = async () => {
        if (!domain) return;
        setLoading(true);
        try {
            const res = await fetch("/api/domains", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ domain, landingId }),
            });
            const data = await res.json();
            if (res.ok) {
                toast.success("Domain added successfully!");
                checkStatus(domain);
            } else {
                toast.error(data.error || "Failed to add domain");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard");
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="justify-start w-full">
                    <Globe className="mr-2 h-4 w-4" /> Custom Domain
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] rounded-3xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        <Globe className="h-6 w-6 text-blue-600" />
                        Custom Domain
                    </DialogTitle>
                    <DialogDescription>
                        Connect your own domain to your landing page. (Pro Feature)
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    <div className="flex gap-2">
                        <Input
                            placeholder="e.g. landing.yourbrand.com"
                            value={domain}
                            onChange={(e) => setDomain(e.target.value.toLowerCase())}
                            className="rounded-2xl h-12"
                            disabled={!!initialDomain && status?.verified}
                        />
                        <Button
                            onClick={handleAddDomain}
                            disabled={loading || !domain || (!!initialDomain && status?.verified)}
                            className="h-12 px-6 bg-blue-600 hover:bg-blue-700 rounded-2xl"
                        >
                            {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : "Connect"}
                        </Button>
                    </div>

                    {status && (
                        <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm font-semibold text-neutral-500">Status</span>
                                {status.verified ? (
                                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 shadow-none px-3 py-1 rounded-full border-none flex gap-1">
                                        <CheckCircle2 className="h-3.5 w-3.5" /> Valid & SSL Active
                                    </Badge>
                                ) : (
                                    <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 shadow-none px-3 py-1 rounded-full border-none flex gap-1">
                                        <AlertCircle className="h-3.5 w-3.5" /> Pending DNS
                                    </Badge>
                                )}
                            </div>

                            {!status.verified && (
                                <div className="space-y-4 rounded-3xl border border-neutral-100 bg-neutral-50/50 p-6">
                                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Configure your DNS</p>

                                    <div className="space-y-3">
                                        <div className="flex flex-col gap-1.5">
                                            <span className="text-[10px] font-black text-neutral-400 uppercase">A Record (Root Domain)</span>
                                            <div className="flex items-center justify-between bg-white px-4 py-3 rounded-2xl border border-neutral-100 text-sm font-mono group">
                                                <span>76.76.21.21</span>
                                                <button onClick={() => copyToClipboard("76.76.21.21")} className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Copy className="h-4 w-4 text-neutral-400 hover:text-blue-600" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-1.5">
                                            <span className="text-[10px] font-black text-neutral-400 uppercase">CNAME (Subdomain)</span>
                                            <div className="flex items-center justify-between bg-white px-4 py-3 rounded-2xl border border-neutral-100 text-sm font-mono group">
                                                <span>cname.vercel-dns.com</span>
                                                <button onClick={() => copyToClipboard("cname.vercel-dns.com")} className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Copy className="h-4 w-4 text-neutral-400 hover:text-blue-600" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <Button
                                        variant="outline"
                                        className="w-full h-11 rounded-2xl border-neutral-200 hover:bg-white hover:border-blue-200 transition-all font-bold"
                                        onClick={() => checkStatus(domain)}
                                        disabled={verifying}
                                    >
                                        {verifying ? (
                                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                        ) : (
                                            <RefreshCw className="h-4 w-4 mr-2" />
                                        )}
                                        Check Configuration
                                    </Button>
                                </div>
                            )}

                            {status.verified && (
                                <div className="p-6 bg-green-50 border border-green-100 rounded-3xl text-center">
                                    <p className="text-sm text-green-700 font-medium">Your domain is live and secured with SSL! 🎉</p>
                                    <a
                                        href={`https://${domain}`}
                                        target="_blank"
                                        className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-green-600 hover:underline"
                                    >
                                        Visit {domain} <ExternalLink className="h-3 w-3" />
                                    </a>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
