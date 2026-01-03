"use client";

import { useNode } from "@craftjs/core";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const Container = ({ children, padding, background, flexDir, gap }: { children?: React.ReactNode; padding?: number; background?: string; flexDir?: "row" | "column"; gap?: string | number }) => {
    const { connectors: { connect, drag }, selected } = useNode((state) => ({
        selected: state.events.selected,
    }));

    return (
        <div
            ref={(ref: HTMLDivElement | null) => {
                if (ref) connect(drag(ref));
            }}
            className={`relative min-h-[50px] transition-all ${selected ? "ring-2 ring-primary" : ""}`}
            style={{
                padding: padding !== undefined ? `${padding}px` : "20px",
                background,
                display: "flex",
                flexDirection: flexDir || "column",
                gap: gap !== undefined ? (typeof gap === 'number' ? `${gap}px` : gap) : "1rem"
            }}
        >
            {children}
        </div>
    );
};

const ContainerSettings = () => {
    const { actions: { setProp }, padding, background } = useNode((node) => ({
        padding: node.data.props.padding,
        background: node.data.props.background,
    }));

    return (
        <div className="space-y-6">
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <Label>Padding ({padding}px)</Label>
                </div>
                <Slider
                    value={[padding || 0]}
                    max={100}
                    step={4}
                    onValueChange={(val) => setProp((props: any) => props.padding = val[0])}
                />
            </div>
            <div className="space-y-2">
                <Label>Background Color</Label>
                <div className="flex gap-2">
                    <Input
                        type="color"
                        value={background || "#ffffff"}
                        className="w-12 h-10 p-1"
                        onChange={(e) => setProp((props: any) => props.background = e.target.value)}
                    />
                    <Input
                        type="text"
                        value={background || "#ffffff"}
                        placeholder="#ffffff"
                        className="flex-1"
                        onChange={(e) => setProp((props: any) => props.background = e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

Container.craft = {
    displayName: "Container",
    props: {
        padding: 20,
        background: "#ffffff",
        flexDir: "column",
    },
    related: {
        settings: ContainerSettings,
    },
};
