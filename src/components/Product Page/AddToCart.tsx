"use client";
import React, { useState } from "react";
import QuantityCounter from "../ui/QuantityCounter";
import { Button } from "../ui/button";
import useCartStore from "@/store/cartStore";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
    prodID: string;
    prodPrice: number;
    prodImage: string;
    prodTitle: string;
};

export default function AddToCart({
    prodID,
    prodPrice,
    prodImage,
    prodTitle,
}: Props) {
    const [prodCount, setProdCount] = useState(1);
    const queryClient = useQueryClient();
    const { addItemToCart } = useCartStore();

    return (
        <>
            <QuantityCounter
                className="w-full"
                counter={prodCount}
                setCounter={setProdCount}
            />
            <Button
                variant={"outline"}
                className="mt-0 block h-full w-full border-black"
                onClick={(e) => {
                    e.preventDefault();
                    addItemToCart(
                        prodID,
                        prodPrice,
                        prodCount,
                        prodImage,
                        prodTitle,
                    );
                    queryClient.invalidateQueries({
                        queryKey: ["cart-items"],
                    });
                }}
            >
                Add to cart
            </Button>
        </>
    );
}
