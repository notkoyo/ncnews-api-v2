import { fetchArticles } from "@/api/mvc";
import { Hono } from "hono";

const articles = new Hono();

articles.get("/articles", (c) => fetchArticles(c));
articles.get("/articles/:article_id", (c) => c.json({ articles: 1 }));
articles.get("/articles/:article_id/comments", (c) =>
  c.json({ comments: 1 })
);
articles.post("/articles/:article_id/comments", (c) =>
  c.json({ comments: 1 })
);
articles.patch("/articles/:article_id", (c) => c.json({ articles: 1 }));

export default articles;