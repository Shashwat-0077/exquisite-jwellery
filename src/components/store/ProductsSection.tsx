"use client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import ProductCard from "../ui/ProductCard";
import { client } from "@/lib/hono";
import { useEffect } from "react";
import { navStore } from "@/store/navBarState";

export default function ProductsSection() {
    const { setIsVisible } = navStore();
    const searchParams = useSearchParams();
    const filterMin = searchParams.get("min");
    const filterMax = searchParams.get("max");
    const filterCategories = searchParams.get("categories");

    const { data, isLoading, error } = useQuery({
        queryKey: [
            "products",
            {
                min: filterMin || "",
                max: filterMax || "",
                categories: filterCategories || [],
            },
        ],
        queryFn: async () => {
            const response = await client.api.products.$get({
                query: {
                    minPrice: filterMin ?? undefined,
                    maxPrice: filterMax ?? undefined,
                    categories: filterCategories ?? undefined,
                },
            });

            if (!response.ok) throw new Error("Failed to fetch products");

            const { data } = await response.json();
            console.log("Client fetched data:", data); // Debugging log
            return data;
        },
    });

    if (isLoading) return "loading...";
    if (error) return <p>{JSON.stringify(error)}</p>;

    return (
        <div className="grid w-full grid-cols-2 gap-x-9 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
            {data?.map((product, index) => (
                <ProductCard
                    key={index}
                    title={product.title}
                    price={product.price}
                    imgSrc={product.image}
                    id={product.ID}
                />
            ))}
        </div>
    );
}
