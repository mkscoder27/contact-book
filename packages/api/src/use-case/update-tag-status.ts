import { TRPCError } from "@trpc/server";
import db from "../services/db";
import { UpdateTagStatusInput } from "../entities";
import { TagStatus } from '@prisma/client';

export default async function UpdateTagStatus({
	id,
	status,
}: UpdateTagStatusInput) {
	const is_tag = await db.findTag({
		where: {
			id
		},
	});

	if (!is_tag) {
		throw new TRPCError({
			code: "NOT_FOUND",
			message: "Tag does not exists",
		});
	}

	const updated_tag = await db.updateTagStatus(id, status as TagStatus);

	return updated_tag;
}
