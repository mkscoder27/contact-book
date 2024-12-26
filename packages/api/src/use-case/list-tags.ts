import db from '../services/db';

export default async function ListTags() {
  const tags = await db.findTags({});

  return tags;
}