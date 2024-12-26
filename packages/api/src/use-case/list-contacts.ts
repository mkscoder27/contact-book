import { TRPCError } from "@trpc/server";
import db from "../services/db";

export default async function ListContacts(search?: string) {
	try {
		const contacts = await db.findContacts({
			where: {
				OR: [
					{
						first_name: { contains: search, mode: "insensitive" },
					},
					{
						last_name: { contains: search, mode: "insensitive" },
					},
					{
						phone: { contains: search, mode: "insensitive" },
					},
				],
			},
		});

		return contacts;
	} catch (error) {
		throw new TRPCError({
			code: "INTERNAL_SERVER_ERROR",
			message: "Failed to fetch contacts",
			cause: error,
		});
	}
}
