"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export default function QuantityCounter({ className }: { className?: string }) {
    const [counter, setCounter] = useState(0);

    const increaseCounter = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        setCounter((prevState) => {
            return prevState + 1;
        });
    };

    const decreaseCounter = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        // TODO : Remove the item from cart when the counter hit 0
        if (counter <= 0) return;
        setCounter((prevState) => {
            return prevState - 1;
        });
    };

    return (
        <div
            className={cn(
                "flex w-[120px] items-center justify-between overflow-hidden rounded-md bg-[#f2f2f2]",
                className
            )}
        >
            <Button
                className="bg-transparent text-black shadow-none hover:bg-transparent md:px-4 px-2"
                onClick={decreaseCounter}
            >
                <Minus size={15} />
            </Button>
            <p className="basis-[100px] text-center">{counter}</p>
            <Button
                className="bg-transparent text-black shadow-none hover:bg-transparent md:px-4 px-2"
                onClick={increaseCounter}
            >
                <Plus size={15} />
            </Button>
        </div>
    );
}
