import { Context } from "hono";
import db from "@/db/database";
import { topics } from "@/db/schema";

const fetchTopics = async (c: Context) => {
  const allTopics = await db.select().from(topics);

  return c.json(allTopics);
};

export default fetchTopics;
