import { createTRPCRouter } from '~/server/api/trpc'
import {
  notificationRouter,
  postRouter,
  userRouter,
} from '~/server/api/routers'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  notification: notificationRouter,
  post: postRouter,
  user: userRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
