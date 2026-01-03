"use client";

import { useNode } from "@craftjs/core";
import { Button as ShadcnButton } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Button = ({ text, color, variant, size, className }: { text: string; color?: string; variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"; size?: "default" | "sm" | "lg" | "icon"; className?: string }) => {
    const { connectors: { connect, drag }, selected } = useNode((state) => ({
        selected: state.events.selected,
    }));

    return (
        <div
            ref={(ref: any) => connect(drag(ref))}
            className={`inline-block ${selected ? "ring-2 ring-blue-500 ring-offset-2 rounded-md" : ""}`}
        >
            <ShadcnButton
                variant={variant}
                size={size}
                style={{ backgroundColor: color }}
                className={className}
                onClick={() => {
                    if (typeof window !== 'undefined' && (window as any).shipkitTrack) {
                        (window as any).shipkitTrack('cta_click', {
                            button_text: text,
                            button_variant: variant || 'default'
                        });
                    }
                }}
            >
                {text}
            </ShadcnButton>
        </div>
    );
};

const ButtonSettings = () => {
    const { actions: { setProp }, text, variant, size, color } = useNode((node) => ({
        text: node.data.props.text,
        variant: node.data.props.variant,
        size: node.data.props.size,
        color: node.data.props.color,
    }));

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label>Button Text</Label>
                <Input
                    value={text}
                    onChange={(e) => setProp((props: any) => props.text = e.target.value)}
                />
            </div>
            <div className="space-y-2">
                <Label>Variant</Label>
                <Select value={variant} onValueChange={(value) => setProp((props: any) => props.variant = value)}>
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="secondary">Secondary</SelectItem>
                        <SelectItem value="outline">Outline</SelectItem>
                        <SelectItem value="ghost">Ghost</SelectItem>
                        <SelectItem value="destructive">Destructive</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label>Size</Label>
                <Select value={size} onValueChange={(value) => setProp((props: any) => props.size = value)}>
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="sm">Small</SelectItem>
                        <SelectItem value="lg">Large</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

Button.craft = {
    displayName: "Button",
    props: {
        text: "Click me",
        variant: "default",
        size: "default",
    },
    related: {
        settings: ButtonSettings,
    },
};
