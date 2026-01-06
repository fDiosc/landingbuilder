import { LandingProvider, useLanding } from '../LandingContext';
import { useNode } from "@craftjs/core";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Sparkles, Video } from "lucide-react";

export const Storylane = ({
    storylaneId,
    title,
    subtitle
}: {
    storylaneId?: string;
    title?: string;
    subtitle?: string;
}) => {
    const { connectors: { connect, drag }, selected } = useNode((state) => ({
        selected: state.events.selected,
    }));

    const { integrations } = useLanding();

    // Priority: 
    // 1. Specifically set in this block (storylaneId prop)
    // 2. Global/Project-level integration
    const id = storylaneId || integrations?.storylaneId;

    return (
        <div
            ref={(ref: any) => connect(drag(ref))}
            className={`py-20 px-6 transition-all ${selected ? "ring-2 ring-primary" : ""}`}
        >
            <div className="max-w-4xl mx-auto text-center mb-12 space-y-4">
                <h2 className="text-3xl md:text-5xl font-black text-neutral-900 tracking-tight">
                    {title || "See it in Action"}
                </h2>
                <p className="text-neutral-500 text-lg max-w-xl mx-auto">
                    {subtitle || "Take a self-guided interactive tour of our platform and explore the features at your own pace."}
                </p>
            </div>

            <div className="max-w-5xl mx-auto rounded-[2.5rem] overflow-hidden border-8 border-neutral-100 premium-shadow bg-neutral-50 aspect-video flex items-center justify-center relative group">
                {id ? (
                    <iframe
                        src={`https://app.storylane.io/demo/${id}`}
                        className="absolute inset-0 w-full h-full border-none"
                        allowFullScreen
                        loading="lazy"
                        title="Storylane Interactive Demo"
                    />
                ) : (
                    <div className="text-center p-12 space-y-6">
                        <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto">
                            <Video className="w-8 h-8" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-neutral-900">Storylane ID Required</h3>
                            <p className="text-neutral-500 max-w-sm mx-auto">
                                To enable the interactive tour, please provide a Storylane Demo ID. You can set a global ID in
                                <span className="font-bold text-neutral-900"> Project Settings</span> or configure
                                this specific block in the <span className="font-bold text-neutral-900">Sidebar</span>.
                            </p>
                        </div>
                    </div>
                )}

                {id && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-100/10 pointer-events-none group-hover:opacity-0 transition-opacity">
                        {/* This overlay just makes it feel premium until interaction */}
                    </div>
                )}
            </div>
        </div>
    );
};

const StorylaneSettings = () => {
    const { actions: { setProp }, storylaneId, title, subtitle } = useNode((node) => ({
        storylaneId: node.data.props.storylaneId,
        title: node.data.props.title,
        subtitle: node.data.props.subtitle,
    }));

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label>Storylane Demo ID</Label>
                <Input
                    value={storylaneId}
                    placeholder="YOUR_STORYLANE_ID"
                    onChange={(e) => setProp((props: any) => props.storylaneId = e.target.value)}
                />
                <p className="text-[10px] text-neutral-400 italic">
                    Overrides Project Settings for this block only.
                </p>
            </div>
            <div className="space-y-2">
                <Label>Section Title</Label>
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
        </div>
    );
};

Storylane.craft = {
    displayName: "Storylane Demo",
    props: {
        storylaneId: "",
        title: "Experience the product",
        subtitle: "Interactive walkthrough of our most powerful features.",
    },
    related: {
        settings: StorylaneSettings,
    },
};
