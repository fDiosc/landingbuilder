"use client";

import { useNode } from "@craftjs/core";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export const Header = ({
    logoText,
    links = [],
    ctaText,
    accentColor
}: {
    logoText?: string;
    links?: Array<{ label: string; href: string }>;
    ctaText?: string;
    accentColor?: string;
}) => {
    const { connectors: { connect, drag }, selected } = useNode((state) => ({
        selected: state.events.selected,
    }));

    const color = accentColor || "#6366f1";

    return (
        <header
            ref={(ref: any) => connect(drag(ref))}
            className={`w-full py-6 px-6 md:px-12 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-neutral-100 transition-all ${selected ? "ring-2 ring-primary" : ""}`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-white text-lg"
                        style={{ backgroundColor: color }}
                    >
                        {logoText?.[0] || "L"}
                    </div>
                    <span className="text-xl font-black text-neutral-900 tracking-tighter uppercase italic">
                        {logoText || "Landing"}
                    </span>
                </div>

                {/* Nav - Desktop */}
                <nav className="hidden md:flex items-center gap-8">
                    {links.map((link, i) => (
                        <a
                            key={i}
                            href={link.href}
                            className="text-sm font-semibold text-neutral-500 hover:text-neutral-900 transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* CTA */}
                <div className="flex items-center gap-4">
                    <button className="hidden sm:block text-sm font-bold text-neutral-900 px-4">
                        Login
                    </button>
                    <Button
                        size="sm"
                        className="font-bold rounded-xl px-5 h-10 premium-shadow text-white border-none"
                        style={{ backgroundColor: color }}
                    >
                        {ctaText || "Get Started"}
                    </Button>
                </div>
            </div>
        </header>
    );
};

const HeaderSettings = () => {
    const { actions: { setProp }, logoText, ctaText, accentColor, links } = useNode((node) => ({
        logoText: node.data.props.logoText,
        ctaText: node.data.props.ctaText,
        accentColor: node.data.props.accentColor,
        links: node.data.props.links || [],
    }));

    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const updateLink = (index: number, key: string, value: any) => {
        setProp((props: any) => {
            const newLinks = [...props.links];
            newLinks[index] = { ...newLinks[index], [key]: value };
            props.links = newLinks;
        }, 500);
    };

    const addLink = () => {
        setProp((props: any) => {
            props.links = [
                ...props.links,
                { label: "New Link", href: "#" }
            ];
        });
    };

    const removeLink = (index: number) => {
        setProp((props: any) => {
            const newLinks = [...props.links];
            newLinks.splice(index, 1);
            props.links = newLinks;
        });
    };

    return (
        <div className="space-y-6">
            <div className="space-y-4 border-b pb-6">
                <div className="space-y-2">
                    <Label>Logo Text</Label>
                    <Input
                        value={logoText}
                        onChange={(e) => setProp((props: any) => props.logoText = e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label>CTA Text</Label>
                    <Input
                        value={ctaText}
                        onChange={(e) => setProp((props: any) => props.ctaText = e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Accent Color</Label>
                    <Input
                        type="color"
                        value={accentColor || "#6366f1"}
                        onChange={(e) => setProp((props: any) => props.accentColor = e.target.value)}
                    />
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <Label className="text-xs font-black uppercase tracking-widest text-neutral-400">Navigation Links</Label>
                    <Button variant="ghost" size="sm" onClick={addLink} className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 gap-1 font-bold">
                        <Plus className="h-3 w-3" /> Add
                    </Button>
                </div>

                <div className="space-y-2">
                    {links.map((link: any, i: number) => (
                        <div key={i} className="border rounded-xl bg-white overflow-hidden shadow-sm">
                            <button
                                onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-3 hover:bg-neutral-50 transition-colors"
                            >
                                <span className="text-sm font-bold text-neutral-700">{link.label || `Link ${i + 1}`}</span>
                                {expandedIndex === i ? <ChevronUp className="h-4 w-4 text-neutral-400" /> : <ChevronDown className="h-4 w-4 text-neutral-400" />}
                            </button>

                            {expandedIndex === i && (
                                <div className="p-4 border-t bg-neutral-50/50 space-y-4">
                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] uppercase font-bold text-neutral-400">Label</Label>
                                        <Input
                                            value={link.label}
                                            onChange={(e) => updateLink(i, "label", e.target.value)}
                                            className="h-8 text-sm"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] uppercase font-bold text-neutral-400">URL / Anchor</Label>
                                        <Input
                                            value={link.href}
                                            onChange={(e) => updateLink(i, "href", e.target.value)}
                                            className="h-8 text-sm"
                                        />
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeLink(i)}
                                        className="w-full h-8 text-red-500 hover:text-red-700 hover:bg-red-50 gap-2 font-bold text-xs"
                                    >
                                        <Trash2 className="h-3 w-3" /> Remove Link
                                    </Button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

Header.craft = {
    displayName: "Header",
    props: {
        logoText: "NPROD",
        ctaText: "Start Building",
        accentColor: "#6366f1",
        links: [
            { label: "Features", href: "#" },
            { label: "Pricing", href: "#" },
            { label: "FAQ", href: "#" },
        ]
    },
    related: {
        settings: HeaderSettings,
    },
};
