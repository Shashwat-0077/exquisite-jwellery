import { z } from 'zod'
import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { zValidator } from '@hono/zod-validator'
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'

export const runtime = 'edge'

const app = new Hono().basePath('/api')

app
    .get('/hello',
        clerkMiddleware(),
        (c) => {
            const auth = getAuth(c)

            return c.json({
                message: "hello next.js",
                userId: auth?.userId
            })
        })



export const GET = handle(app)
export const POST = handle(app)