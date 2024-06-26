import {
  fetchArticles,
  fetchArticlesById,
  fetchCommentsByArticleId,
  postCommentByArticleId,
  updateArticleById,
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
articles.patch("/articles/:article_id", (c) => updateArticleById(c));

export default articles;
