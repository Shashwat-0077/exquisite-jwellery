import ProductCard from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import TwoWaySlider from "@/components/ui/TwoWaySlider";
import { Label } from "@/components/ui/label";
import React from "react";
import { data } from "@/dummy/data";

const moreFilters = ["Rings", "Earrings", "Necklace", "Bracelets", "Luxe"];

export default function Store() {
    // TODO : Make the the sheet responsive, item will be visible when screen is big, and hidden when screen is small

    return (
        <div className="mt-10 flex min-h-[calc(100svh-80px)] px-7 lg:gap-10">
            <div className="hidden basis-1/4 flex-col items-center space-y-10 overflow-hidden rounded-xl bg-gray-100 px-10 py-10 lg:flex">
                <h1 className="text-2xl">Filters</h1>
                <div className="flex items-center justify-center gap-3">
                    <Checkbox />
                    <Label>Include Out of Stock items</Label>
                </div>
                <div className="w-full space-y-3 self-start">
                    <h2 className="pl-4">Price</h2>
                    <TwoWaySlider className="w-full" />
                </div>
                <div className="space-y-3 self-start">
                    <h1 className="pl-4">More Filters</h1>
                    <ul className="space-y-2">
                        {moreFilters.map((value, index) => (
                            <li key={index} className="flex gap-3">
                                <Checkbox id={`filter-${value}`} />
                                <Label>{value}</Label>
                            </li>
                        ))}
                    </ul>
                </div>
                <Button>Apply</Button>
            </div>
            {/* // TODO : Make the side component for the filter for the mobile view */}
            <div className=""></div>
            <div className="grid w-full grid-cols-2 gap-x-9 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
                {data.map((product, index) => (
                    <ProductCard
                        key={index}
                        title={product.title}
                        price={product.price}
                        imgSrc={product.img}
                    />
                ))}
            </div>
        </div>
    );
}
