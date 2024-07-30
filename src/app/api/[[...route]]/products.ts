import { z } from "zod";
import { Hono } from "hono";
import { and, eq, gte, inArray, lte, sql } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { v4 as uuidv4 } from "uuid";
import { products, categories } from "@/db/schema";
import { ProductsSchema } from "@/db/schema";
import { zValidator } from "@hono/zod-validator";
import { clerkMiddleware } from "@hono/clerk-auth";
import { authMiddleWare } from "./utils/authMiddleware";
import { adminMiddleware } from "./utils/adminMiddleware";
import { GetBulkSchema, GetByQuerySchema } from "./schema/products";

// TODO : Enable auth after testing for all routes

type variables = {
    userID: string;
};

const app = new Hono<{ Variables: variables }>()
    //  Get by query
    .get("/", zValidator("query", GetByQuerySchema), async (c) => {
        const {
            minPrice: filterMinPrice,
            maxPrice: filterMaxPrice,
            categories: filterCategories,
        } = c.req.valid("query");

        // Combine the queries for minPrice, maxPrice, and categories
        const [maxPriceResult, minPriceResult, categoriesResult] =
            await Promise.all([
                !filterMaxPrice
                    ? db
                          .select({
                              value: sql<number>`MAX(${products.price})`,
                          })
                          .from(products)
                    : Promise.resolve([{ value: NaN }]),
                !filterMinPrice
                    ? db
                          .select({
                              value: sql<number>`MIN(${products.price})`,
                          })
                          .from(products)
                    : Promise.resolve([{ value: NaN }]),
                !filterCategories || filterCategories.length === 0
                    ? db.select({ name: categories.name }).from(categories)
                    : Promise.resolve([]),
            ]);

        const maxPrice = filterMaxPrice ?? maxPriceResult[0].value;
        const minPrice = filterMinPrice ?? minPriceResult[0].value;
        const cats =
            filterCategories && filterCategories.length > 0
                ? filterCategories
                : categoriesResult.map((val) => val.name);

        const data = await db
            .select({
                ID: products.ID,
                title: products.title,
                description: products.description,
                image: products.image,
                price: products.price,
                categoryName: categories.name,
            })
            .from(products)
            .innerJoin(categories, eq(products.category, categories.id))
            .where(
                and(
                    gte(products.price, minPrice),
                    lte(products.price, maxPrice),
                    inArray(categories.name, cats),
                ),
            );

        return c.json({ data });
    })
    // Get bulk by id
    .get("/bulk", zValidator("query", GetBulkSchema), async (c) => {
        const { ids } = c.req.valid("query");

        const data = await db
            .select()
            .from(products)
            .where(inArray(products.ID, ids));

        return c.json({ data });
    })
    // Get by id
    .get(
        "/:id",
        zValidator("param", z.object({ id: z.string() })),
        async (c) => {
            const { id } = c.req.valid("param");
            const [data] = await db
                .select()
                .from(products)
                .where(eq(products.ID, id));

            return c.json({ data: data });
        },
    )
    .post(
        "/",
        clerkMiddleware(),
        authMiddleWare,
        adminMiddleware,
        zValidator("json", ProductsSchema.omit({ ID: true })),
        async (c) => {
            const { title, price, description, category, image } =
                c.req.valid("json");

            // By default drizzle always return the array as the SQl's also returns the array, if want a single entry, we have to know that's that entry is unique and destructure the first result with an array destructuring

            const [data] = await db
                .insert(products)
                .values({
                    ID: uuidv4(),
                    title,
                    price,
                    description,
                    category,
                    image,
                })
                .returning();

            return c.json({ data });
        },
    )
    .post(
        "/insert-many",
        clerkMiddleware(),
        authMiddleWare,
        adminMiddleware,
        zValidator("json", z.array(ProductsSchema.omit({ ID: true }))),
        async (c) => {
            const values = c.req.valid("json");

            // By default drizzle always return the array as the SQl's also returns the array, if want a single entry, we have to know that's that entry is unique and destructure the first result with an array destructuring
            let count = 0;

            for (let product of values) {
                await db
                    .insert(products)
                    .values({
                        ID: uuidv4(),
                        title: product.title,
                        price: product.price,
                        description: product.description,
                        category: product.category,
                        image: product.image,
                    })
                    .returning();
                count++;
            }

            return c.json({ msg: `Inserted ${count} item(s)` });
        },
    )
    .patch(
        "/:id",
        clerkMiddleware(),
        authMiddleWare,
        adminMiddleware,
        zValidator("param", z.object({ id: z.string() })),
        zValidator("json", ProductsSchema.omit({ ID: true })),
        async (c) => {
            const { id } = c.req.valid("param");
            const values = c.req.valid("json");

            await db.update(products).set(values).where(eq(products.ID, id));

            return c.json({ message: "yet to be implemented" });
        },
    )
    .delete(
        "/:id",
        clerkMiddleware(),
        authMiddleWare,
        adminMiddleware,
        zValidator("param", z.object({ id: z.string() })),
        async (c) => {
            const { id } = c.req.valid("param");

            const [data] = await db
                .delete(products)
                .where(eq(products.ID, id))
                .returning({ prodID: products.ID });

            return c.json({ message: data.prodID + " is deleted" });
        },
    );

export default app;
