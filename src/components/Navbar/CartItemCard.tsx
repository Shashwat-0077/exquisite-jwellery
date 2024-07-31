"use client";
import { client } from "@/lib/hono";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useCartStore from "@/store/cartStore";
import React, { useState } from "react";
import ImageWithFallback from "../ui/ImageWithFallback";
import QuantityCounter from "../ui/QuantityCounter";
import { ScrollArea } from "../ui/scroll-area";
import { Trash2 } from "lucide-react";

type PropType = {
    prodImage: string;
    prodTitle: string;
    prodID: string;
    prodQuant: number;
    prodPrice: number;
};

export default function CartItemCard({
    prodID,
    prodTitle,
    prodImage,
    prodPrice,
    prodQuant,
}: PropType) {
    const {
        cartItems,
        removeItemFromCart,
        increaseItemQuantity,
        decreaseItemQuantity,
    } = useCartStore();
    const queryClient = useQueryClient();

    const [prodCount, setProdCount] = useState(prodQuant);

    return (
        <React.Fragment>
            <div className="flex gap-2">
                <div className="w-[80px] flex-shrink-0">
                    <ImageWithFallback
                        src={prodImage}
                        alt="image"
                        aspectRatio={1 / 1}
                    />
                </div>
                <div className="mb-1 flex flex-col justify-center gap-2">
                    <h1 className="mb-1 font-bold">{prodTitle}</h1>
                    <Trash2
                        size={18}
                        color="red"
                        className="cursor-pointer"
                        onClick={() => {
                            removeItemFromCart(prodID);
                            queryClient.invalidateQueries({
                                queryKey: ["cart-items"],
                            });
                        }}
                    />
                </div>
            </div>
            <div className="flex flex-col items-end justify-center">
                <p className="pr-3">&#8377; {prodPrice}</p>
                <QuantityCounter
                    className="mt-2"
                    counter={prodCount}
                    setCounter={setProdCount}
                    onIncrement={() => {
                        increaseItemQuantity(prodID);
                    }}
                    onDecrement={() => {
                        decreaseItemQuantity(prodID);
                    }}
                />
            </div>
        </React.Fragment>
    );
}
