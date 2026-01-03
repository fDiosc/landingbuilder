"use client";

import { useNode } from "@craftjs/core";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Loader2, Mail, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { submitLead } from "@/app/actions/leads";
import { useLanding } from "../LandingContext";

export const LeadForm = ({
    title,
    description,
    placeholder,
    buttonText,
    successMessage,
    backgroundColor,
    buttonColor
}: {
    title?: string;
    description?: string;
    placeholder?: string;
    buttonText?: string;
    successMessage?: string;
    backgroundColor?: string;
    buttonColor?: string;
}) => {
    const { connectors: { connect, drag }, selected } = useNode((state) => ({
        selected: state.events.selected,
    }));

    const { landingId } = useLanding();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!landingId) {
            // In editor mode, we just simulate
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                toast.success(successMessage || "Thank you! We'll be in touch.");
                setEmail("");
            }, 1000);
            return;
        }

        setLoading(true);
        try {
            const result = await submitLead(landingId, email);
            if (result.success) {
                // Track lead capture event in GA4
                if (typeof window !== 'undefined' && (window as any).shipkitTrack) {
                    (window as any).shipkitTrack('lead_capture', {
                        email_domain: email.split('@')[1],
                        form_location: 'lead_form_component'
                    });
                }
                toast.success(successMessage || "Thank you! We'll be in touch.");
                setEmail("");
            } else {
                toast.error("Ocorreu um erro ao salvar seu contato.");
            }
        } catch (error) {
            toast.error("Erro de conexão.");
        } finally {
            setLoading(true);
            setLoading(false);
        }
    };

    return (
        <div
            id="contact"
            ref={(ref: any) => connect(drag(ref))}
            className={`max-w-3xl mx-auto p-8 md:p-14 rounded-[2.5rem] transition-all my-12 cursor-pointer ${selected ? "ring-2 ring-primary ring-inset" : "bg-white premium-shadow border border-neutral-100"}`}
            style={{ backgroundColor: backgroundColor || "#ffffff" }}
        >
            <div className="text-center space-y-4 mb-10 pointer-events-none">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[11px] font-bold uppercase tracking-wider">
                        <Sparkles className="h-3 w-3" />
                        Limited Beta Access
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-600 text-[11px] font-bold uppercase tracking-wider">
                        <CheckCircle2 className="h-3 w-3" />
                        CRM Integration Ready
                    </div>
                </div>

                <h3 className="text-3xl font-black text-neutral-900 tracking-tight">{title || "Join the future of creation"}</h3>
                <p className="text-neutral-500 text-base max-w-sm mx-auto leading-relaxed">
                    {description || "Be the first to know when we launch and get exclusive early-bird benefits."}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="relative flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                    <Input
                        type="email"
                        required
                        placeholder={placeholder || "your@email.com"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-14 h-16 bg-neutral-50 border-transparent focus:bg-white focus:ring-primary rounded-2xl transition-all shadow-inner text-base"
                    />
                </div>
                <Button
                    type="submit"
                    disabled={loading}
                    className="h-16 px-10 font-bold rounded-2xl premium-shadow active:scale-[0.98] transition-all hover:opacity-90 text-white text-base"
                    style={{ backgroundColor: buttonColor || "#2563eb" }}
                >
                    {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : buttonText || "Get Access"}
                </Button>
            </form>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-[11px] text-neutral-400 font-medium">
                <p>Guaranteed zero spam. Unsubscribe at any time.</p>
                <span className="hidden sm:block opacity-30">•</span>
                <p className="flex items-center gap-1.5 opacity-80">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                    Privacy Compliant
                </p>
            </div>
        </div>
    );
};

const LeadFormSettings = () => {
    const { actions: { setProp }, title, description, placeholder, buttonText, successMessage, buttonColor, backgroundColor } = useNode((node) => ({
        title: node.data.props.title,
        description: node.data.props.description,
        placeholder: node.data.props.placeholder,
        buttonText: node.data.props.buttonText,
        successMessage: node.data.props.successMessage,
        buttonColor: node.data.props.buttonColor,
        backgroundColor: node.data.props.backgroundColor,
    }));

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-neutral-400">Headline</Label>
                    <Input
                        value={title}
                        onChange={(e) => setProp((props: any) => props.title = e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-neutral-400">Description</Label>
                    <Textarea
                        value={description}
                        onChange={(e) => setProp((props: any) => props.description = e.target.value)}
                        className="text-sm min-h-[80px]"
                    />
                </div>
            </div>

            <div className="pt-4 border-t space-y-4">
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-neutral-400">Input Placeholder</Label>
                        <Input
                            value={placeholder}
                            onChange={(e) => setProp((props: any) => props.placeholder = e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-neutral-400">Button Text</Label>
                        <Input
                            value={buttonText}
                            onChange={(e) => setProp((props: any) => props.buttonText = e.target.value)}
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-neutral-400">Success Message</Label>
                    <Input
                        value={successMessage}
                        onChange={(e) => setProp((props: any) => props.successMessage = e.target.value)}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-neutral-400">Button Color</Label>
                        <Input
                            type="color"
                            value={buttonColor || "#2563eb"}
                            onChange={(e) => setProp((props: any) => props.buttonColor = e.target.value)}
                            className="h-10"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-neutral-400">Background</Label>
                        <Input
                            type="color"
                            value={backgroundColor || "#ffffff"}
                            onChange={(e) => setProp((props: any) => props.backgroundColor = e.target.value)}
                            className="h-10"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

LeadForm.craft = {
    displayName: "Lead Form",
    props: {
        title: "Join the future of creation",
        description: "Be the first to know when we launch and get exclusive early-bird benefits.",
        placeholder: "your@email.com",
        buttonText: "Get Early Access",
        successMessage: "Thank you! We'll be in touch.",
        backgroundColor: "#ffffff",
        buttonColor: "#2563eb",
    },
    related: {
        settings: LeadFormSettings,
    },
};
