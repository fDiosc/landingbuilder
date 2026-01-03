"use client";

import { useEditor } from "@craftjs/core";
import {
    Settings as SettingsIcon,
    Layers,
    Trash2,
    ChevronDown
} from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";

export function SettingsPanel() {
    const { actions, selected, isEnabled } = useEditor((state, query) => {
        const [currentNodeId] = state.events.selected;
        let selected;

        if (currentNodeId) {
            selected = {
                id: currentNodeId,
                name: state.nodes[currentNodeId].data.name,
                settings: state.nodes[currentNodeId].related && state.nodes[currentNodeId].related.settings,
                isDeletable: query.node(currentNodeId).isDeletable(),
            };
        }

        return {
            selected,
            isEnabled: state.options.enabled,
        };
    });

    return isEnabled && selected ? (
        <div className="w-80 border-l border-neutral-200 bg-white overflow-y-auto">
            <div className="flex flex-col h-full">
                {/* Header */}
                <div className="h-14 border-b border-neutral-100 flex items-center justify-between px-4">
                    <div className="flex items-center gap-2">
                        <SettingsIcon className="h-4 w-4 text-neutral-400" />
                        <span className="text-sm font-semibold text-neutral-900 capitalize">{selected.name} Settings</span>
                    </div>
                    {selected.isDeletable && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => actions.delete(selected.id)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    )}
                </div>

                {/* Settings Content */}
                <div className="flex-1 p-4">
                    {selected.settings && React.createElement(selected.settings)}
                    {!selected.settings && (
                        <div className="flex flex-col items-center justify-center p-8 text-center bg-neutral-50 rounded-lg border border-dashed border-neutral-200">
                            <Layers className="h-8 w-8 text-neutral-300 mb-2" />
                            <p className="text-xs text-neutral-500">No settings available for this component.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    ) : (
        <div className="w-80 border-l border-neutral-200 bg-white flex flex-col items-center justify-center p-8 text-center text-neutral-400 italic">
            <div className="p-4 rounded-full bg-neutral-50 mb-4">
                <MousePointer2 className="h-10 w-10 text-neutral-200" />
            </div>
            <p className="text-sm">Select a component on the canvas to edit its properties.</p>
        </div>
    );
}

import { MousePointer2 } from "lucide-react";
