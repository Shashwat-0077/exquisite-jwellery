import { create } from 'zustand'

// NOTE : Look into context and all for next.js
// reference path="https://docs.pmnd.rs/zustand/guides/nextjs"


type Store = {
    isVisible: boolean,
    setIsVisible: (val: boolean) => void
}

const navStore = create<Store>()((set) => ({
    isVisible: true,
    setIsVisible: (val: boolean) => set((state) => ({ isVisible: val })),
}))

export { navStore }
