"use client";

import { useNode } from "@craftjs/core";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const FAQ = ({
    title,
    items = []
}: {
    title?: string;
    items?: Array<{
        question: string;
        answer: string;
    }>;
}) => {
    const { connectors: { connect, drag }, selected } = useNode((state) => ({
        selected: state.events.selected,
    }));

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div
            id="faq"
            ref={(ref: any) => connect(drag(ref))}
            className={`py-24 px-6 md:px-12 transition-all ${selected ? "ring-2 ring-primary" : ""}`}
        >
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-black text-neutral-900 tracking-tight">
                        {title || "Frequently Asked Questions"}
                    </h2>
                    <p className="text-neutral-500 text-lg">
                        Everything you need to know about our product and billing.
                    </p>
                </div>

                <div className="space-y-4">
                    {items.map((item, i) => (
                        <div key={i} className="border-b border-neutral-100 pb-4">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between py-4 text-left group"
                            >
                                <span className="text-lg font-bold text-neutral-900 group-hover:text-primary transition-colors pr-8">
                                    {item.question}
                                </span>
                                {openIndex === i ? (
                                    <ChevronUp className="h-5 w-5 text-neutral-400" />
                                ) : (
                                    <ChevronDown className="h-5 w-5 text-neutral-400" />
                                )}
                            </button>
                            {openIndex === i && (
                                <div className="pb-6 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <p className="text-neutral-500 leading-relaxed">
                                        {item.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const FAQSettings = () => {
    const { actions: { setProp }, title, items } = useNode((node) => ({
        title: node.data.props.title,
        items: node.data.props.items || [],
    }));

    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const updateItem = (index: number, key: string, value: any) => {
        setProp((props: any) => {
            const newItems = [...props.items];
            newItems[index] = { ...newItems[index], [key]: value };
            props.items = newItems;
        }, 500);
    };

    const addItem = () => {
        setProp((props: any) => {
            props.items = [
                ...props.items,
                {
                    question: "New Question",
                    answer: "Provide a helpful answer here."
                }
            ];
        });
    };

    const removeItem = (index: number) => {
        setProp((props: any) => {
            const newItems = [...props.items];
            newItems.splice(index, 1);
            props.items = newItems;
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
                    <Label className="text-xs font-black uppercase tracking-widest text-neutral-400">Manage Q&A</Label>
                    <Button variant="ghost" size="sm" onClick={addItem} className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 gap-1 font-bold">
                        <Plus className="h-3 w-3" /> Add
                    </Button>
                </div>

                <div className="space-y-2">
                    {items.map((item: any, i: number) => (
                        <div key={i} className="border rounded-xl bg-white overflow-hidden shadow-sm">
                            <button
                                onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-3 hover:bg-neutral-50 transition-colors"
                            >
                                <span className="text-sm font-bold text-neutral-700 truncate pr-4">{item.question || `Question ${i + 1}`}</span>
                                {expandedIndex === i ? <ChevronUp className="h-4 w-4 text-neutral-400 flex-shrink-0" /> : <ChevronDown className="h-4 w-4 text-neutral-400 flex-shrink-0" />}
                            </button>

                            {expandedIndex === i && (
                                <div className="p-4 border-t bg-neutral-50/50 space-y-4">
                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] uppercase font-bold text-neutral-400">Question</Label>
                                        <Input
                                            value={item.question}
                                            onChange={(e) => updateItem(i, "question", e.target.value)}
                                            className="h-8 text-sm"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] uppercase font-bold text-neutral-400">Answer</Label>
                                        <Textarea
                                            value={item.answer}
                                            onChange={(e) => updateItem(i, "answer", e.target.value)}
                                            className="text-sm min-h-[100px]"
                                        />
                                    </div>

                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeItem(i)}
                                        className="w-full h-8 text-red-500 hover:text-red-700 hover:bg-red-50 gap-2 font-bold text-xs"
                                    >
                                        <Trash2 className="h-3 w-3" /> Remove Item
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

FAQ.craft = {
    displayName: "FAQ Section",
    props: {
        title: "Questions? We have answers.",
        items: [
            {
                question: "How does it work?",
                answer: "Our platform uses AI to generate high-converting landing pages in seconds, based on your business description."
            },
            {
                question: "Can I use my own domain?",
                answer: "Yes! You can connect custom domains on any our paid plans."
            }
        ]
    },
    related: {
        settings: FAQSettings,
    },
};
