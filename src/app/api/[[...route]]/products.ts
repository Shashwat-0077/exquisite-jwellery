import { z } from "zod";
import { Hono } from "hono";
import { and, eq, gte, lte } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { v4 as uuidv4 } from "uuid";
import { products } from "@/db/schema";
import { ProductsSchema } from "@/db/schema";
import { zValidator } from "@hono/zod-validator";
import { clerkMiddleware } from "@hono/clerk-auth";
import { authMiddleWare } from "./utils/authMiddleware";
import { adminMiddleware } from "./utils/adminMiddleware";

//TODO : check is their any to abstract the functionality if user is signed in
// TODO : check if the user is admin or not for all routes
// TODO : Enable auth after testing for all routes

type variables = {
    userID: string;
};

const app = new Hono<{ Variables: variables }>()
    .get(
        "/",
        zValidator(
            "query",
            z.object({
                minPrice: z.string().transform((val) => parseInt(val)),
                maxPrice: z.string().transform((val) => parseInt(val)),
                categories: z.string().array().optional(),
            }),
        ),
        async (c) => {
            const { minPrice, maxPrice, categories } = c.req.valid("query");
            console.log({ maxPrice, type: typeof maxPrice });

            const data = await db
                .select()
                .from(products)
                .where(
                    and(
                        gte(products.price, minPrice),
                        lte(products.price, maxPrice),
                    ),
                );

            return c.json({ data });
        },
    )
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
