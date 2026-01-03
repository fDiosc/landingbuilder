"use client";

import { useNode } from "@craftjs/core";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const Footer = ({
    logoText,
    accentColor
}: {
    logoText?: string;
    accentColor?: string;
}) => {
    const { connectors: { connect, drag }, selected } = useNode((state) => ({
        selected: state.events.selected,
    }));

    const color = accentColor || "#6366f1";

    return (
        <footer
            ref={(ref: any) => connect(drag(ref))}
            className={`py-20 px-6 bg-white border-t border-neutral-100 transition-all ${selected ? "ring-2 ring-primary" : ""}`}
        >
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="col-span-2 lg:col-span-2 space-y-6">
                        <div className="flex items-center gap-2">
                            <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-white text-lg"
                                style={{ backgroundColor: color }}
                            >
                                {logoText?.[0] || "L"}
                            </div>
                            <span className="text-xl font-bold text-neutral-900 tracking-tighter uppercase italic">
                                {logoText || "Landing"}
                            </span>
                        </div>
                        <p className="text-neutral-500 text-sm max-w-xs leading-relaxed">
                            Building the future of high-conversion landing pages with AI-powered design and speed.
                        </p>
                    </div>

                    {/* Links Column 1 */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-black text-neutral-900 uppercase tracking-widest">Product</h4>
                        <ul className="space-y-2">
                            {["Features", "Integrations", "Pricing", "Updates"].map((l, i) => (
                                <li key={i}><a href="#" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">{l}</a></li>
                            ))}
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-black text-neutral-900 uppercase tracking-widest">Company</h4>
                        <ul className="space-y-2">
                            {["About Us", "Contact", "Careers", "Blog"].map((l, i) => (
                                <li key={i}><a href="#" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">{l}</a></li>
                            ))}
                        </ul>
                    </div>

                    {/* Links Column 3 */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-black text-neutral-900 uppercase tracking-widest">Legal</h4>
                        <ul className="space-y-2">
                            {["Privacy", "Terms", "Cookie Policy", "License"].map((l, i) => (
                                <li key={i}><a href="#" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">{l}</a></li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-neutral-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-neutral-400 font-medium">
                        © {new Date().getFullYear()} {logoText || "LandingBuilder"}. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors font-medium">Twitter / X</a>
                        <a href="#" className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors font-medium">GitHub</a>
                        <a href="#" className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors font-medium">Discord</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const FooterSettings = () => {
    const { actions: { setProp }, logoText, accentColor } = useNode((node) => ({
        logoText: node.data.props.logoText,
        accentColor: node.data.props.accentColor,
    }));

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label>Brand Name</Label>
                <Input
                    value={logoText}
                    onChange={(e) => setProp((props: any) => props.logoText = e.target.value)}
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
    );
};

Footer.craft = {
    displayName: "Footer",
    props: {
        logoText: "NPROD",
        accentColor: "#6366f1",
    },
    related: {
        settings: FooterSettings,
    },
};
