"use client";

import { useNode } from "@craftjs/core";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Sparkles, Zap, Shield, Rocket, Heart, Star, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const iconMap = {
    zap: Zap,
    shield: Shield,
    rocket: Rocket,
    heart: Heart,
    star: Star,
    sparkles: Sparkles
};

export const FeatureCards = ({
    title,
    subtitle,
    features = [],
    accentColor
}: {
    title?: string;
    subtitle?: string;
    features?: Array<{
        title: string;
        description: string;
        icon: keyof typeof iconMap;
    }>;
    accentColor?: string;
}) => {
    const { connectors: { connect, drag }, selected } = useNode((state) => ({
        selected: state.events.selected,
    }));

    const color = accentColor || "#6366f1";

    return (
        <div
            id="features"
            ref={(ref: any) => connect(drag(ref))}
            className={`py-24 px-6 transition-all ${selected ? "ring-2 ring-primary" : ""}`}
        >
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-black text-neutral-900 tracking-tight">
                        {title || "Everything you need to succeed"}
                    </h2>
                    <p className="text-neutral-500 text-lg max-w-2xl mx-auto">
                        {subtitle || "Powerful features designed to help you build, launch, and scale your next big idea."}
                    </p>
                </div>

                <div className={`grid grid-cols-1 md:grid-cols-${Math.min(features.length, 3)} gap-8`}>
                    {features.map((feature, i) => {
                        const Icon = iconMap[feature.icon] || Zap;
                        return (
                            <div
                                key={i}
                                className="group p-8 rounded-[2rem] bg-white border border-neutral-100 premium-shadow hover:scale-[1.02] hover:border-primary/20 transition-all duration-300"
                            >
                                <div
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors"
                                    style={{ backgroundColor: `${color}15`, color: color }}
                                >
                                    <Icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-neutral-500 text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const FeatureCardsSettings = () => {
    const { actions: { setProp }, title, subtitle, accentColor, features } = useNode((node) => ({
        title: node.data.props.title,
        subtitle: node.data.props.subtitle,
        accentColor: node.data.props.accentColor,
        features: node.data.props.features || [],
    }));

    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const updateFeature = (index: number, key: string, value: any) => {
        setProp((props: any) => {
            const newFeatures = [...props.features];
            newFeatures[index] = { ...newFeatures[index], [key]: value };
            props.features = newFeatures;
        }, 500);
    };

    const addFeature = () => {
        setProp((props: any) => {
            props.features = [
                ...props.features,
                {
                    title: "New Feature",
                    description: "Describe this amazing feature.",
                    icon: "zap"
                }
            ];
        });
    };

    const removeFeature = (index: number) => {
        setProp((props: any) => {
            const newFeatures = [...props.features];
            newFeatures.splice(index, 1);
            props.features = newFeatures;
        });
    };

    return (
        <div className="space-y-6">
            <div className="space-y-4 border-b pb-6">
                <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                        value={title}
                        onChange={(e) => setProp((props: any) => props.title = e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Subtitle</Label>
                    <Input
                        value={subtitle}
                        onChange={(e) => setProp((props: any) => props.subtitle = e.target.value)}
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
                    <Label className="text-xs font-black uppercase tracking-widest text-neutral-400">Manage Features</Label>
                    <Button variant="ghost" size="sm" onClick={addFeature} className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 gap-1 font-bold">
                        <Plus className="h-3 w-3" /> Add
                    </Button>
                </div>

                <div className="space-y-2">
                    {features.map((feature: any, i: number) => (
                        <div key={i} className="border rounded-xl bg-white overflow-hidden shadow-sm">
                            <button
                                onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-3 hover:bg-neutral-50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-bold text-neutral-700">{feature.title || `Feature ${i + 1}`}</span>
                                </div>
                                {expandedIndex === i ? <ChevronUp className="h-4 w-4 text-neutral-400" /> : <ChevronDown className="h-4 w-4 text-neutral-400" />}
                            </button>

                            {expandedIndex === i && (
                                <div className="p-4 border-t bg-neutral-50/50 space-y-4">
                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] uppercase font-bold text-neutral-400">Icon</Label>
                                        <Select
                                            value={feature.icon}
                                            onValueChange={(val) => updateFeature(i, "icon", val)}
                                        >
                                            <SelectTrigger className="h-8 text-xs bg-white">
                                                <SelectValue placeholder="Select icon" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.keys(iconMap).map(iconName => (
                                                    <SelectItem key={iconName} value={iconName} className="text-xs">
                                                        {iconName.charAt(0).toUpperCase() + iconName.slice(1)}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] uppercase font-bold text-neutral-400">Title</Label>
                                        <Input
                                            value={feature.title}
                                            onChange={(e) => updateFeature(i, "title", e.target.value)}
                                            className="h-8 text-sm"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] uppercase font-bold text-neutral-400">Description</Label>
                                        <Input
                                            value={feature.description}
                                            onChange={(e) => updateFeature(i, "description", e.target.value)}
                                            className="h-8 text-sm"
                                        />
                                    </div>

                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeFeature(i)}
                                        className="w-full h-8 text-red-500 hover:text-red-700 hover:bg-red-50 gap-2 font-bold text-xs"
                                    >
                                        <Trash2 className="h-3 w-3" /> Remove Card
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

FeatureCards.craft = {
    displayName: "Feature Cards",
    props: {
        title: "Built for modern founders",
        subtitle: "The tools you need to validate your micro-SaaS in days, not months.",
        accentColor: "#6366f1",
        features: [
            {
                title: "Lightning Fast",
                description: "Optimized for speed and performance, ensuring your users have a seamless experience.",
                icon: "zap",
            },
            {
                title: "Secure by Design",
                description: "Built with the latest security standards to keep your data safe and protected.",
                icon: "shield",
            },
            {
                title: "Scalable Infrastructure",
                description: "Effortlessly scale your business with our robust and reliable cloud infrastructure.",
                icon: "rocket",
            }
        ]
    },
    related: {
        settings: FeatureCardsSettings,
    },
};
