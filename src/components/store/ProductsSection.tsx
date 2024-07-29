"use client";
import ProductCard from "../ui/ProductCard";
import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export default function ProductsSection() {
    const searchParams = useSearchParams();
    const min = searchParams.get("min");
    const max = searchParams.get("max");
    const categories = searchParams.get("categories");

    const { data, error, isLoading } = useQuery({
        queryKey: ["posts", { min, max, categories }],
        queryFn: async (args) => {
            const response = await client.api.products.$get({
                query: {
                    minPrice: min ?? undefined,
                    maxPrice: max ?? undefined,
                    categories: categories ?? undefined,
                },
            });

            if (!response.ok) throw new Error("Failed to fetch accounts");

            const { data } = await response.json();
            return data;
        },
    });

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
