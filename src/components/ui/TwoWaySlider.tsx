"use client";
import React, { useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";
import { Input } from "./input";

const MIN = 100;
const MAX = 1500;

export default function TwoWaySlider({ className }: { className?: string }) {
    const [values, setValues] = useState<[number, number]>([MIN, MAX]);

    const handleValueChange = (newValues: [number, number]) => {
        setValues(newValues);
    };

    return (
        <div className={cn(`flex w-80 flex-col items-center`, className)}>
            <Slider.Root
                className="relative flex h-5 w-full items-center"
                value={values}
                onValueChange={handleValueChange}
                min={MIN}
                max={MAX}
                step={1}
            >
                <Slider.Track className="relative h-1 flex-grow rounded-full bg-gray-300">
                    <Slider.Range className="absolute h-full rounded-full bg-black" />
                </Slider.Track>
                {values.map((value, index) => (
                    <Slider.Thumb
                        key={index}
                        defaultValue={value}
                        className={`block h-5 w-5 cursor-pointer rounded-full border-2 border-black bg-white ring-primary/30 transition-[box-shadow,_transform] focus-within:scale-125 focus-within:shadow-none focus-within:outline-none focus-within:ring`}
                    />
                ))}
            </Slider.Root>
            <output className="flex items-center justify-center gap-3">
                <Input
                    defaultValue={values[0]}
                    type="number"
                    onChange={(e) => {
                        e.preventDefault();
                        // if(e.target.value)
                        setValues([
                            parseInt(e.target.value || "0") ?? 0,
                            values[1],
                        ]);
                    }}
                    max={1500}
                    min={0}
                />
                <span>-</span>
                <Input
                    defaultValue={values[1]}
                    type="number"
                    onChange={(e) => {
                        e.preventDefault();
                        // if(e.target.value)
                        setValues([
                            values[0],
                            parseInt(e.target.value || "0") ?? 0,
                        ]);
                    }}
                    max={1500}
                    min={0}
                />
            </output>
        </div>
    );
}
