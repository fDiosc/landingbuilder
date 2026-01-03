"use client";

import { useNode } from "@craftjs/core";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Check, CreditCard, Sparkles, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export const PricingTable = ({
    title,
    plans = [],
    accentColor,
    sectionId = "pricing"
}: {
    title?: string;
    plans?: Array<{
        name: string;
        price: string;
        description: string;
        features: string[];
        buttonText: string;
        popular?: boolean;
    }>;
    accentColor?: string;
    sectionId?: string;
}) => {
    const { connectors: { connect, drag }, selected } = useNode((state) => ({
        selected: state.events.selected,
    }));

    const color = accentColor || "#6366f1";

    return (
        <div
            id={sectionId}
            ref={(ref: any) => connect(drag(ref))}
            className={`py-24 px-6 md:px-12 transition-all scroll-mt-20 ${selected ? "ring-2 ring-primary" : ""}`}
        >
            <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 text-[11px] font-bold uppercase tracking-wider mb-2">
                    <CreditCard className="h-3 w-3" />
                    Secure Stripe Checkout
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-neutral-900 tracking-tight">
                    {title || "Simple, Transparent Plans"}
                </h2>
                <p className="text-neutral-500 text-lg max-w-xl mx-auto">
                    {plans.length > 0 ? "Choose the plan that fits your growth." : "Start for free and upgrade as you grow. No hidden fees."}
                </p>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-${Math.min(plans.length, 3)} gap-8 max-w-7xl mx-auto items-stretch`}>
                {plans.map((plan, i) => (
                    <div
                        key={i}
                        className={`relative p-8 md:p-12 rounded-[2.5rem] flex flex-col transition-all duration-300 ${plan.popular
                            ? "bg-white border-2 shadow-2xl scale-105 z-10"
                            : "bg-neutral-50/50 border border-neutral-100 hover:bg-white hover:border-neutral-200"
                            }`}
                        style={{ borderColor: plan.popular ? color : undefined }}
                    >
                        {plan.popular && (
                            <div
                                className="absolute -top-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-white px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest premium-shadow"
                                style={{ backgroundColor: color }}
                            >
                                <Sparkles className="h-3 w-3" />
                                Most Popular
                            </div>
                        )}

                        <div className="mb-8 flex-1">
                            <h3 className="text-xl font-bold text-neutral-900 mb-2">{plan.name}</h3>
                            <div className="flex items-baseline gap-1.5 mb-6">
                                <span className="text-5xl font-black text-neutral-900 tracking-tighter">{plan.price}</span>
                                <span className="text-neutral-500 font-medium">/month</span>
                            </div>
                            <p className="text-neutral-500 text-sm leading-relaxed mb-8">{plan.description}</p>

                            <div className="space-y-4">
                                {plan.features.map((feature, fi) => (
                                    <div key={fi} className="flex items-start gap-3">
                                        <div
                                            className="mt-1 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center bg-neutral-100/50"
                                            style={{ color: plan.popular ? color : "#666" }}
                                        >
                                            <Check className="h-4 w-4 stroke-[3px]" />
                                        </div>
                                        <span className="text-sm text-neutral-600 font-medium leading-tight">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            className="w-full py-5 px-6 rounded-2xl font-bold text-base transition-all active:scale-[0.98] text-white mt-8"
                            style={{ backgroundColor: plan.popular ? color : "#111" }}
                        >
                            {plan.buttonText}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const PricingTableSettings = () => {
    const { actions: { setProp }, title, accentColor, plans, sectionId } = useNode((node) => ({
        title: node.data.props.title,
        accentColor: node.data.props.accentColor,
        plans: node.data.props.plans || [],
        sectionId: node.data.props.sectionId,
    }));

    const [expandedPlan, setExpandedPlan] = useState<number | null>(null);

    const updatePlan = (index: number, key: string, value: any) => {
        setProp((props: any) => {
            const newPlans = [...props.plans];
            newPlans[index] = { ...newPlans[index], [key]: value };
            props.plans = newPlans;
        }, 500);
    };

    const addPlan = () => {
        setProp((props: any) => {
            props.plans = [
                ...props.plans,
                {
                    name: "New Plan",
                    price: "$99",
                    description: "Describe your plan here.",
                    features: ["Feature 1", "Feature 2"],
                    buttonText: "Join Now",
                    popular: false
                }
            ];
        });
    };

    const removePlan = (index: number) => {
        setProp((props: any) => {
            const newPlans = [...props.plans];
            newPlans.splice(index, 1);
            props.plans = newPlans;
        });
    };

    return (
        <div className="space-y-6">
            <div className="space-y-4 border-b pb-6">
                <div className="space-y-2">
                    <Label>Section Title</Label>
                    <Input
                        value={title}
                        onChange={(e) => setProp((props: any) => props.title = e.target.value)}
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
                <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-neutral-400">Section ID (for anchor links)</Label>
                    <Input
                        value={sectionId}
                        onChange={(e) => setProp((props: any) => props.sectionId = e.target.value)}
                        placeholder="e.g. pricing"
                    />
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <Label className="text-xs font-black uppercase tracking-widest text-neutral-400">Manage Plans</Label>
                    <Button variant="ghost" size="sm" onClick={addPlan} className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 gap-1 font-bold">
                        <Plus className="h-3 w-3" /> Add
                    </Button>
                </div>

                <div className="space-y-3">
                    {plans.map((plan: any, i: number) => (
                        <div key={i} className="border rounded-xl bg-white overflow-hidden shadow-sm">
                            <button
                                onClick={() => setExpandedPlan(expandedPlan === i ? null : i)}
                                className="w-full flex items-center justify-between p-3 hover:bg-neutral-50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full ${plan.popular ? 'bg-blue-500' : 'bg-neutral-300'}`} />
                                    <span className="text-sm font-bold text-neutral-700">{plan.name || `Plan ${i + 1}`}</span>
                                    <span className="text-xs text-neutral-400 font-medium">{plan.price}</span>
                                </div>
                                {expandedPlan === i ? <ChevronUp className="h-4 w-4 text-neutral-400" /> : <ChevronDown className="h-4 w-4 text-neutral-400" />}
                            </button>

                            {expandedPlan === i && (
                                <div className="p-4 border-t bg-neutral-50/50 space-y-4 animate-in slide-in-from-top-2 duration-200">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-1.5">
                                            <Label className="text-[10px] uppercase font-bold text-neutral-400">Name</Label>
                                            <Input
                                                value={plan.name}
                                                onChange={(e) => updatePlan(i, "name", e.target.value)}
                                                className="h-8 text-sm"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label className="text-[10px] uppercase font-bold text-neutral-400">Price</Label>
                                            <Input
                                                value={plan.price}
                                                onChange={(e) => updatePlan(i, "price", e.target.value)}
                                                className="h-8 text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] uppercase font-bold text-neutral-400">Description</Label>
                                        <Input
                                            value={plan.description}
                                            onChange={(e) => updatePlan(i, "description", e.target.value)}
                                            className="h-8 text-sm"
                                        />
                                    </div>

                                    <div className="flex items-center justify-between p-2 bg-white rounded-lg border shadow-sm">
                                        <Label className="text-[10px] uppercase font-bold text-neutral-600">Popular Plan</Label>
                                        <Switch
                                            checked={plan.popular}
                                            onCheckedChange={(val) => updatePlan(i, "popular", val)}
                                        />
                                    </div>

                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removePlan(i)}
                                        className="w-full h-8 text-red-500 hover:text-red-700 hover:bg-red-50 gap-2 font-bold text-xs"
                                    >
                                        <Trash2 className="h-3 w-3" /> Remove Plan
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

PricingTable.craft = {
    displayName: "Pricing Table",
    props: {
        title: "Simple, Delicious Plans",
        accentColor: "#6366f1",
        plans: [
            {
                name: "Starter",
                price: "$0",
                description: "Perfect for personal projects and MVP validation.",
                features: ["1 Active Project", "Basic Analytics", "Community Support"],
                buttonText: "Get Started Free",
            },
            {
                name: "Founder",
                price: "$49",
                description: "Everything you need to grow your Micro-SaaS.",
                features: ["10 Active Projects", "Advanced Analytics", "Priority Support"],
                buttonText: "Start 7-day Trial",
                popular: true,
            },
        ]
    },
    related: {
        settings: PricingTableSettings,
    },
};
