"use client";
import ProductCard from "../ui/ProductCard";
import { client } from "@/lib/hono";
import { filterStore } from "@/store/filters";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function ProductsSection() {
    const { filters } = filterStore();

    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ["posts"],
        queryFn: async (args) => {
            const response = await client.api.products.$get({
                query: {
                    minPrice: `${filters.min}`,
                    maxPrice: `${filters.max}`,
                    categories: filters.categories ?? [],
                },
            });

            if (!response.ok) throw new Error("Failed to fetch accounts");

            const { data } = await response.json();
            return data;
        },
    });

    useEffect(() => {
        refetch();
    }, [filters, refetch]);

    // TODO : make a skeleton
    if (isLoading) return "loading...";
    // TODO : handle error
    if (error) return <p>{JSON.stringify(error)}</p>;

    return (
        <div className="grid w-full grid-cols-2 gap-x-9 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
            {data?.map((product, index) => (
                <ProductCard
                    key={index}
                    title={product.title}
                    price={product.price}
                    imgSrc={product.image}
                />
            ))}
        </div>
    );
}
