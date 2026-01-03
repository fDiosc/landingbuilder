"use client";

import { useNode, useEditor } from "@craftjs/core";
import {
    Type,
    MousePointer2,
    Trash2,
    Move
} from "lucide-react";

export const RenderNode = ({ render }: { render: React.ReactNode }) => {
    const {
        id,
        connectors: { drag },
        actions,
        selected,
        hovered,
        name,
    } = useNode((state) => ({
        selected: state.events.selected,
        hovered: state.events.hovered,
        name: state.data.name,
    }));

    const { actions: editorActions, query } = useEditor();
    const isDeletable = query.node(id).isDeletable();

    return (
        <div
            className={`relative group ${selected ? "ring-2 ring-primary rounded" : hovered ? "ring-1 ring-primary/40 ring-offset-2 rounded" : ""}`}
            onClick={(e) => {
                e.stopPropagation();
                editorActions.selectNode(id);
            }}
        >
            {selected && (
                <div className="absolute -top-6 left-0 bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded-t font-medium flex items-center gap-1.5 z-50">
                    <div ref={(ref: any) => drag(ref)} className="cursor-move"><Move className="h-3 w-3" /></div>
                    <span>{name}</span>
                </div>
            )}
            {render}
        </div>
    );
};
