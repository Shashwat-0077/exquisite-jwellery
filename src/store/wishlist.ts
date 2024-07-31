import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistState {
    wishlistIds: string[];
    addWishlistId: (id: string) => void;
    removeWishlistId: (id: string) => void;
}

export const useWishlistStore = create<WishlistState>()(
    persist(
        (set) => ({
            wishlistIds: [],
            addWishlistId: (id) =>
                set((state) => ({ wishlistIds: [...state.wishlistIds, id] })),
            removeWishlistId: (id) =>
                set((state) => ({
                    wishlistIds: state.wishlistIds.filter(
                        (itemId) => itemId !== id,
                    ),
                })),
        }),
        {
            name: "wishlist-storage", // name of the item in localStorage
        },
    ),
);
