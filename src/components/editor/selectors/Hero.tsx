"use client";

import { useNode } from "@craftjs/core";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Hero = ({
    title,
    subtitle,
    background,
    buttonColor,
    buttonText
}: {
    title: string;
    subtitle: string;
    background?: string;
    buttonColor?: string;
    buttonText?: string;
}) => {
    const { connectors: { connect, drag }, selected } = useNode((state) => ({
        selected: state.events.selected,
    }));

    return (
        <div
            ref={(ref: any) => connect(drag(ref))}
            className={`relative py-32 px-10 text-center flex flex-col items-center justify-center gap-8 transition-all overflow-hidden cursor-pointer ${selected ? "ring-2 ring-primary ring-inset" : ""}`}
            style={{ background: background || "transparent" }}
        >
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hero-glow pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto space-y-6 pointer-events-none">
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-neutral-900 leading-[1.1]">
                        <span className="text-gradient block">{title}</span>
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-500 max-w-2xl mx-auto leading-relaxed">
                        {subtitle}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                    <div
                        className="w-full sm:w-auto px-8 py-4 text-lg font-bold rounded-2xl premium-shadow text-white border-none flex items-center justify-center"
                        style={{ backgroundColor: buttonColor || "#6366f1" }}
                    >
                        {buttonText || "Get Started Now"}
                    </div>
                </div>
            </div>
        </div>
    );
};

const HeroSettings = () => {
    const { actions: { setProp }, title, subtitle, background, buttonColor, buttonText } = useNode((node) => ({
        title: node.data.props.title,
        subtitle: node.data.props.subtitle,
        background: node.data.props.background,
        buttonColor: node.data.props.buttonColor,
        buttonText: node.data.props.buttonText,
    }));

    return (
        <div className="space-y-6">
            <div className="p-1.5 bg-blue-50 rounded-lg text-[10px] font-bold text-blue-600 uppercase tracking-wider text-center">
                Hero Content
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label className="text-xs font-bold text-neutral-600">Headline</Label>
                    <Input
                        value={title}
                        onChange={(e) => setProp((props: any) => props.title = e.target.value)}
                        placeholder="Main headline..."
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-xs font-bold text-neutral-600">Subheadline</Label>
                    <Textarea
                        value={subtitle}
                        onChange={(e) => setProp((props: any) => props.subtitle = e.target.value)}
                        className="text-sm min-h-[100px]"
                        placeholder="Subheadline details..."
                    />
                </div>
            </div>

            <div className="pt-4 border-t space-y-4">
                <div className="space-y-2">
                    <Label className="text-xs font-bold text-neutral-600">Button Text</Label>
                    <Input
                        value={buttonText}
                        onChange={(e) => setProp((props: any) => props.buttonText = e.target.value)}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="text-xs font-bold text-neutral-600">Button Color</Label>
                        <Input
                            type="color"
                            value={buttonColor || "#6366f1"}
                            onChange={(e) => setProp((props: any) => props.buttonColor = e.target.value)}
                            className="h-9 p-1"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-bold text-neutral-600">Background</Label>
                        <Input
                            type="color"
                            value={background === "transparent" ? "#ffffff" : background}
                            onChange={(e) => setProp((props: any) => props.background = e.target.value)}
                            className="h-9 p-1"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

Hero.craft = {
    displayName: "Hero",
    props: {
        title: "The Ultimate Way to Validate Your Idea",
        subtitle: "Build, launch and gather feedback in record time with our AI-powered landing page builder.",
        background: "transparent",
        buttonText: "Get Started Now",
        buttonColor: "#6366f1"
    },
    related: {
        settings: HeroSettings,
    },
};
