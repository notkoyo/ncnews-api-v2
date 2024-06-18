import { Context } from "hono";
import db from "@/db/database";
import { articles } from "@/db/schema";

const fetchArticles = async (c: Context) => {
  const allArticles = await db.select().from(articles);
  
  return c.json(allArticles);
};

export default fetchArticles;