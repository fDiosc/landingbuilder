"use client";

import React, { createContext, useContext } from 'react';

interface LandingContextType {
    landingId: string | null;
}

const LandingContext = createContext<LandingContextType>({ landingId: null });

export const LandingProvider = ({ landingId, children }: { landingId: string; children: React.ReactNode }) => {
    return (
        <LandingContext.Provider value={{ landingId }}>
            {children}
        </LandingContext.Provider>
    );
};

export const useLanding = () => useContext(LandingContext);
