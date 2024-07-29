import { create } from "zustand";

// NOTE : Look into context and all for next.js
// reference path="https://docs.pmnd.rs/zustand/guides/nextjs"

// TODO : add "Include out of stocks"
type FilterStore = {
    filters: {
        min: number;
        max: number;
        categories: string[];
    };
    setFilters: ({
        minVal,
        maxVal,
        categoriesVal,
    }: {
        minVal: number;
        maxVal: number;
        categoriesVal: string[];
    }) => void;
};

const filterStore = create<FilterStore>()((set) => ({
    filters: {
        min: 100,
        max: 1500,
        categories: [],
    },
    setFilters: ({ minVal, maxVal, categoriesVal }) =>
        set((state) => ({
            filters: { min: minVal, max: maxVal, categories: categoriesVal },
        })),
}));

export { filterStore };
