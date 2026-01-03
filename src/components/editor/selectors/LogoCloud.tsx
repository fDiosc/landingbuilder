"use client";

import { useNode } from "@craftjs/core";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const LogoCloud = ({
    title,
    logos = []
}: {
    title?: string;
    logos?: string[];
}) => {
    const { connectors: { connect, drag }, selected } = useNode((state) => ({
        selected: state.events.selected,
    }));

    return (
        <div
            ref={(ref: any) => connect(drag(ref))}
            className={`py-16 px-6 transition-all ${selected ? "ring-2 ring-primary" : ""}`}
        >
            <div className="max-w-6xl mx-auto text-center space-y-12">
                <p className="text-sm font-bold uppercase tracking-widest text-neutral-400">
                    {title || "Trusted by world-class creators"}
                </p>
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
                    {logos.map((logo, i) => (
                        <span key={i} className="text-2xl md:text-3xl font-black text-neutral-900 tracking-tighter">
                            {logo}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

const LogoCloudSettings = () => {
    const { actions: { setProp }, title, logos } = useNode((node) => ({
        title: node.data.props.title,
        logos: node.data.props.logos || [],
    }));

    const updateLogo = (index: number, value: string) => {
        setProp((props: any) => {
            const newLogos = [...props.logos];
            newLogos[index] = value;
            props.logos = newLogos;
        }, 500);
    };

    const addLogo = () => {
        setProp((props: any) => {
            props.logos = [...props.logos, "NEW LOGO"];
        });
    };

    const removeLogo = (index: number) => {
        setProp((props: any) => {
            const newLogos = [...props.logos];
            newLogos.splice(index, 1);
            props.logos = newLogos;
        });
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2 border-b pb-6">
                <Label>Section Title</Label>
                <Input
                    value={title}
                    onChange={(e) => setProp((props: any) => props.title = e.target.value)}
                />
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <Label className="text-xs font-black uppercase tracking-widest text-neutral-400">Manage Logos</Label>
                    <Button variant="ghost" size="sm" onClick={addLogo} className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 gap-1 font-bold">
                        <Plus className="h-3 w-3" /> Add
                    </Button>
                </div>

                <div className="space-y-2">
                    {logos.map((logo: string, i: number) => (
                        <div key={i} className="flex items-center gap-2">
                            <Input
                                value={logo}
                                onChange={(e) => updateLogo(i, e.target.value)}
                                className="h-8 text-sm"
                            />
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeLogo(i)}
                                className="h-8 w-8 text-red-400 hover:text-red-600"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

LogoCloud.craft = {
    displayName: "Logo Cloud",
    props: {
        title: "LOVED BY TEAMS AT",
        logos: ["ACME", "GLOBAL", "STRIPE", "VERCEL", "LINEAR", "SUPABASE"]
    },
    related: {
        settings: LogoCloudSettings,
    },
};
