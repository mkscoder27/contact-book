import { TRPCError } from '@trpc/server';
import { TagInput } from '../entities';
import db from '../services/db';

export default async function CreateTag({name}: TagInput) {
  const is_tag = await db.findTag({
    where: {
      name
    }
  });

  if(is_tag){
    throw new TRPCError({
      code: "CONFLICT",
      message: "Tag already existed"
    })
  }

  const tag = await db.createTag({name});

  return tag;
}