import ProductCard from "@/components/ui/ProductCard";
import { data } from "@/dummy/data";
import React from "react";

export default function Wishlist() {
    return (
        <div className="mt-10 flex min-h-[calc(100svh-80px)] flex-col justify-center">
            <p className="text-center text-[35px]">Wishlist</p>
            <div className="mb-40 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-x-8 gap-y-2 sm:px-32 px-12">
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
