"use client";
import ProductCard from "@/components/ui/ProductCard";
import { client } from "@/lib/hono";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "react-use";
import type { InferRequestType, InferResponseType } from "hono/client";
import { useEffect } from "react";

type ResType = InferResponseType<typeof client.api.products.bulk.$get>;

export default function Wishlist() {
    const [products] = useLocalStorage<string[]>("products", []);

    const { data, isLoading } = useQuery({
        queryKey: ["wishlist"],
        queryFn: async (args) => {
            if (!products || products.length === 0) return;

            const response = await client.api.products.bulk.$get({
                query: {
                    ids: JSON.stringify(products),
                },
            });

            console.log(products);
            if (!response.ok) throw new Error("Failed to fetch products");
            const { data } = await response.json();

            return data;
        },
        staleTime: 0,
    });

    if (isLoading) return "Loading...";

    return (
        <div className="mt-10 flex min-h-[calc(100svh-80px)] flex-col justify-center">
            <p className="text-center text-[35px]">Wishlist</p>
            <div className="mb-40 grid gap-x-8 gap-y-2 px-12 sm:grid-cols-2 sm:px-32 md:grid-cols-3 lg:grid-cols-4">
                {data
                    ? data.map((product, index) => (
                          <ProductCard
                              key={index}
                              id={product.ID}
                              title={product.title}
                              price={product.price}
                              imgSrc={product.image}
                          />
                      ))
                    : "Explore more, find something that suits you"}
            </div>
        </div>
    );
}
