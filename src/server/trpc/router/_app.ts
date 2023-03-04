import { router } from "../trpc";
import { authRouter } from "./auth";
import { spotRouter } from "./spot";

export const appRouter = router({
  spot: spotRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
