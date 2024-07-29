import ProductsSection from "@/components/store/ProductsSection";
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from "@tanstack/react-query";
import { db } from "@/db/drizzle";
import { products } from "@/db/schema";
import Filters from "@/components/store/filters";

export default async function Store() {
    const queryClient = new QueryClient();

    // FIXME : I guess this is not working cause inside the section the parameters for cache is changed, should look into it
    await queryClient.prefetchQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            const data = await db.select().from(products);
            return data;
        },
    });

    return (
        <div className="mt-10 flex min-h-[calc(100svh-80px)] px-7 lg:gap-10">
            <Filters />
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ProductsSection />
            </HydrationBoundary>
        </div>
    );
}
