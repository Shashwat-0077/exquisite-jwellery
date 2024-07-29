import { create } from "zustand";

// NOTE : Look into context and all for next.js
// reference path="https://docs.pmnd.rs/zustand/guides/nextjs"

type NavStore = {
    isVisible: boolean;
    setIsVisible: (val: boolean) => void;
};

const navStore = create<NavStore>()((set) => ({
    isVisible: true,
    setIsVisible: (val: boolean) => set((state) => ({ isVisible: val })),
}));

export { navStore };
