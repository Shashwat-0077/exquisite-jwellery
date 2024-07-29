import ProductsSection from "@/components/store/ProductsSection";
import Filters from "@/components/store/filters";
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from "@tanstack/react-query";
import { db } from "@/db/drizzle";
import { products } from "@/db/schema";

export default async function Store() {
    // TODO : Convert this to default product request route
    // put the filter in Layout.tsx and only have the productSection in children
    // get the query from url
    // rather than using zustand state variable, change the path and get the filters from that

    const queryClient = new QueryClient();

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
