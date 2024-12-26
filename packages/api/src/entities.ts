import { TagStatus } from '@prisma/client';
import {
	enum as enum_,
	nativeEnum,
	object,
	string,
} from "zod";

export const CreateContactInput = object({
	first_name: string(),
	last_name: string(),
	phone: string(),
});
export type CreateContactInput = Zod.infer<typeof CreateContactInput>;

export const TagInput = object({
	name: string(),
});
export type TagInput = Zod.infer<typeof TagInput>;


export const UpdateTagStatusInput = object({
	id: string(),
	status: nativeEnum(TagStatus)
});
export type UpdateTagStatusInput = Zod.infer<typeof UpdateTagStatusInput>;
