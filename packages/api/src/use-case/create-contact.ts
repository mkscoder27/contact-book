import { TRPCError } from '@trpc/server';
import { CreateContactInput } from '../entities';
import db from '../services/db';

export default async function CreateContact(input: CreateContactInput) {
  const is_contact = await db.findContact(input.phone);

  if(is_contact){
    throw new TRPCError({
      code: "CONFLICT",
      message: "Contact with same number already existed"
    })
  }

  const contact = await db.createContact(input);

  return contact;
}