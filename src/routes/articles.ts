import {
  fetchArticles,
  fetchArticlesById,
  fetchCommentsByArticleId,
  postCommentByArticleId,
} from "@/model";
import { Hono } from "hono";

const articles = new Hono();

articles.get("/articles", (c) => fetchArticles(c));
articles.get("/articles/:article_id", (c) => fetchArticlesById(c));
articles.get("/articles/:article_id/comments", (c) =>
  fetchCommentsByArticleId(c)
);
articles.post("/articles/:article_id/comments", (c) =>
  postCommentByArticleId(c)
);
articles.patch("/articles/:article_id", (c) => c.json({ articles: 1 }));

export default articles;
