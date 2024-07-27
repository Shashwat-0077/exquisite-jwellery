import { db } from "@/db/drizzle";
import { accounts } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { zValidator } from "@hono/zod-validator";
import { ProductsSchema } from "@/db/schema";
import { v4 as uuidv4 } from "uuid";

const app = new Hono()
    .get("/", clerkMiddleware(), async (c) => {
        const auth = getAuth(c);
        if (!auth?.userId) {
            throw new HTTPException(401, {
                res: c.json({ error: "Unauthorized" }, 401),
            });
        }
        const data = await db
            .select({ id: accounts.id, name: accounts.name })
            .from(accounts)
            .where(eq(accounts.id, auth.userId));

        return c.json({ data });
    })
    .post(
        "/",
        clerkMiddleware(),
        zValidator("json", AccountSchema.pick({ id: true, name: true })),
        async (c) => {
            const { id, name } = c.req.valid("json");
            const auth = getAuth(c);
            if (!auth?.userId) {
                throw new HTTPException(401, {
                    res: c.json({ error: "Unauthorized" }, 401),
                });
            }

            // By default drizzle always return the array as the SQl's also returns the array, if want a single entry, we have to know that's that entry is unique and destructure the first result with an array destructuring
            const [data] = await db
                .insert(accounts)
                .values({
                    id: uuidv4(),
                    userID: auth.userId,
                    name,
                })
                .returning();

            return c.json({ data });
        },
    );

export default app;
