"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type GlobalState = {
  loadingDone: boolean;
  setLoadingDone: (value: boolean) => void;
  ctaClicked: boolean;
  setCtaClicked: (value: boolean) => void;
  manifestoDone: boolean;
  setManifestoDone: (value: boolean) => void;
  manifestoAnimated: boolean;
  setManifestoAnimated: (value: boolean) => void;
  manifestoPara1Done: boolean; // 👈 NEW
  setManifestoPara1Done: (value: boolean) => void; // 👈 NEW
};

const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

export function GlobalStateProvider({ children }: { children: ReactNode }) {
  const [loadingDone, setLoadingDone] = useState(false);
  const [ctaClicked, setCtaClicked] = useState(false);
  const [manifestoDone, setManifestoDone] = useState(false);
  const [manifestoAnimated, setManifestoAnimated] = useState(false);
  const [manifestoPara1Done, setManifestoPara1Done] = useState(false); // 👈 NEW

  return (
    <GlobalStateContext.Provider
      value={{
        loadingDone,
        setLoadingDone,
        ctaClicked,
        setCtaClicked,
        manifestoDone,
        setManifestoDone,
        manifestoAnimated,
        setManifestoAnimated,
        manifestoPara1Done,    // 👈 NEW
        setManifestoPara1Done, // 👈 NEW
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
}

export function useGlobalState() {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within GlobalStateProvider");
  }
  return context;
}