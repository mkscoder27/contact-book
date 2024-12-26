import { createTRPCReact } from "@trpc/react-query";
import { inferRouterOutputs } from "@trpc/server";
import { type AppRouter } from "@contactbook/api/src/framework/trpc-server";

export type RouterOutput = inferRouterOutputs<AppRouter>;

export const trpc = createTRPCReact<AppRouter>({});
