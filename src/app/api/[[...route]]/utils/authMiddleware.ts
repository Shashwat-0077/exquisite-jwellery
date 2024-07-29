import { Context } from "hono";
import { getAuth } from "@hono/clerk-auth";

export const authMiddleWare = async (c: Context, next: () => Promise<void>) => {
    const auth = getAuth(c);

    // TODO : Enable auth

    // if (!auth?.userId) {
    //     throw new HTTPException(401, {
    //         res: c.json({ error: "Unauthorized" }, 401),
    //     });
    // }
    c.set("userID", "Need to enable auth first for the ID");
    await next();
};
