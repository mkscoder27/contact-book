import { Prisma, PrismaClient, TagStatus } from "@prisma/client";

const Db = () => {
	const db = new PrismaClient({
		log: ["error"],
	});

	return {
		createContact: (data: Prisma.ContactUncheckedCreateInput) =>
			db.contact.create({ data }),
		findContact: (phone: string) => db.contact.findFirst({ where: { phone } }),
		findContacts: (args: Prisma.ContactFindManyArgs) =>
			db.contact.findMany(args),

		createTag: (data: Prisma.TagUncheckedCreateInput) =>
			db.tag.create({ data }),
		findTag: (args: Prisma.TagFindFirstArgs) => db.tag.findFirst(args),
		findTags: (args: Prisma.TagFindManyArgs) => db.tag.findMany(args),
		updateTagStatus: (id: string, status: TagStatus) =>
			db.tag.update({
				where: {
					id,
				},
				data: {
					status,
				},
			}),
	};
};

const db = Db();

export default db;
