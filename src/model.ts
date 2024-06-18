import { Context } from "hono";
import db from "@/db/database";
import { users, topics, articles, comments } from "@/db/schema";
import * as fs from "fs/promises";
import { eq } from "drizzle-orm";
import { Endpoints } from "./api";

const fetchEndpoints = async (c: Context) => {
  const endpoints = await fs.readFile('./src/endpoints.json', "utf-8");
  const parsedEndpoints: Endpoints = JSON.parse(endpoints);

  return c.json(parsedEndpoints);
};

const fetchUsers = async (c: Context) => {
  const allUsers = await db.select().from(users);
  
  return c.json(allUsers);
};


const fetchTopics = async (c: Context) => {
  const allTopics = await db.select().from(topics);

  return c.json(allTopics);
};

const fetchArticles = async (c: Context) => {
  const allArticles = await db.select().from(articles);
  
  return c.json(allArticles);
};

const fetchArticlesById = async (c: Context) => {
  try {
    const id: number = Number(c.req.param("article_id"));
    const allArticlesById = await db.select().from(articles).where(eq(articles.article_id, id));
    
    return c.json(allArticlesById);
  } catch (error) {
    console.error(error);
  }
};

const fetchCommentsByArticleId = async (c: Context) => {
  try {
    const id: number = Number(c.req.param("article_id"));
    const allCommentsById = await db.select().from(comments).where(eq(comments.article_id, id));
    
    return c.json(allCommentsById);
  } catch (error) {
    console.error(error);
  }
};

const postCommentByArticleId = async (c: Context) => {
  try {
    const article_id: number = Number(c.req.param("article_id"));
    const { username, body }: { username: string; body: string; } = await c.req.json();

    const comment = await db.insert(comments).values({
      body,
      article_id,
      author: username,
    }).returning();

    c.status(201);
    return c.json(comment);
  } catch (error) {
    console.error(error);
  }
};

export {
  fetchUsers,
  fetchEndpoints,
  fetchTopics,
  fetchArticles,
  fetchArticlesById,
  fetchCommentsByArticleId,
  postCommentByArticleId,
};