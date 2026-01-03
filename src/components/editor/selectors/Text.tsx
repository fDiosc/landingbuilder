"use client";

import { useNode } from "@craftjs/core";
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Text = ({
    text: initialText,
    color,
    fontSize,
    fontWeight,
    textAlign,
    className
}: {
    text: string;
    color?: string;
    fontSize?: string | number;
    fontWeight?: string;
    textAlign?: string;
    className?: string;
}) => {
    const { connectors: { connect, drag }, selected, actions: { setProp } } = useNode((state) => ({
        selected: state.events.selected,
    }));

    const [editable, setEditable] = useState(false);
    const contentRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!selected) setEditable(false);
    }, [selected]);

    const handleInput = (e: React.FormEvent<HTMLSpanElement>) => {
        const newText = e.currentTarget.innerText;
        setProp((props: any) => props.text = newText, 500);
    };

    return (
        <div
            ref={(ref: any) => connect(drag(ref))}
            className={`transition-all ${selected ? "ring-1 ring-primary/50 ring-offset-2 rounded-sm" : ""} ${className || ""}`}
            onClick={() => selected && setEditable(true)}
        >
            <span
                ref={contentRef}
                contentEditable={editable}
                suppressContentEditableWarning
                onBlur={() => setEditable(false)}
                onInput={handleInput}
                style={{
                    color: color || "inherit",
                    fontSize: fontSize ? (typeof fontSize === 'number' ? `${fontSize}px` : fontSize) : "inherit",
                    fontWeight: fontWeight || "inherit",
                    textAlign: (textAlign as any) || "left",
                    display: "inline-block",
                    width: "100%",
                    outline: "none"
                }}
            >
                {initialText}
            </span>
        </div>
    );
};

const TextSettings = () => {
    const { actions: { setProp }, fontSize, color, text, fontWeight, textAlign } = useNode((node) => ({
        fontSize: node.data.props.fontSize,
        color: node.data.props.color,
        text: node.data.props.text,
        fontWeight: node.data.props.fontWeight,
        textAlign: node.data.props.textAlign,
    }));

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label className="text-[10px] uppercase font-bold text-neutral-400">Content</Label>
                <Input
                    value={text}
                    onChange={(e) => setProp((props: any) => props.text = e.target.value)}
                />
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-neutral-400">Size (px)</Label>
                    <Input
                        type="number"
                        value={fontSize || 16}
                        onChange={(e) => setProp((props: any) => props.fontSize = parseInt(e.target.value))}
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-neutral-400">Color</Label>
                    <Input
                        type="color"
                        value={color || "#000000"}
                        onChange={(e) => setProp((props: any) => props.color = e.target.value)}
                        className="h-10"
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-neutral-400">Weight</Label>
                    <Select value={fontWeight || "normal"} onValueChange={(val) => setProp((props: any) => props.fontWeight = val)}>
                        <SelectTrigger className="h-8 text-xs">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="bold">Bold</SelectItem>
                            <SelectItem value="black">Black</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-neutral-400">Align</Label>
                    <Select value={textAlign || "left"} onValueChange={(val) => setProp((props: any) => props.textAlign = val)}>
                        <SelectTrigger className="h-8 text-xs">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="left">Left</SelectItem>
                            <SelectItem value="center">Center</SelectItem>
                            <SelectItem value="right">Right</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
};

Text.craft = {
    displayName: "Text",
    props: {
        text: "Click to edit text inline...",
        fontSize: 16,
        color: "#4b5563",
        fontWeight: "normal",
        textAlign: "left"
    },
    related: {
        settings: TextSettings,
    },
};
