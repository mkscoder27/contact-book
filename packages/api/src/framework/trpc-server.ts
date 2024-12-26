import { initTRPC } from "@trpc/server";
import { createKoaMiddleware } from "trpc-koa-adapter";

import CreateContact from "../use-case/create-contact";
import CreateTag from "../use-case/create-tag";
import ListContacts from "../use-case/list-contacts";
import ListTags from "../use-case/list-tags";
import UpdateTagStatus from "../use-case/update-tag-status";

import {
	CreateContactInput,
	TagInput,
	UpdateTagStatusInput,
} from "../entities";
import { string } from "zod";

async function createContext({ req, res }: any) {
	// Create your context based on the request object
	// Will be available as `ctx` in all your resolvers
	// This is just an example of something you might want to do in your ctx fn
	return { req };
}

type Context = Awaited<ReturnType<typeof createContext>>;

const trpc = initTRPC.context<Context>().create();

export const router = trpc.router({
	env: trpc.procedure.query(() => process.env),
	createContact: trpc.procedure
		.input(CreateContactInput)
		.mutation((req) => CreateContact(req.input)),
	listContacts: trpc.procedure
		.input(string().optional())
		.query((req) => ListContacts(req.input)),
	createTag: trpc.procedure
		.input(TagInput)
		.mutation((req) => CreateTag(req.input)),
	listTags: trpc.procedure.query((req) => ListTags()),
	updateTagStatus: trpc.procedure
		.input(UpdateTagStatusInput)
		.mutation((req) => UpdateTagStatus(req.input)),
});

export type AppRouter = typeof router;

export default () =>
	createKoaMiddleware({
		router,
		prefix: "/trpc",
		createContext,
	});
