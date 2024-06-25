import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import { main, users, topics, articles, comments } from "@/routes/all";
import { config } from "dotenv";
import { ExtendedEnv } from "./api";
config();

const { PORT } = process.env as ExtendedEnv;

const api = new Hono().basePath("/api/v2");

api.use(prettyJSON());
api.use("*", cors());

// Main Routes
api.route("/", main);

// Users Routes
api.route("/", users);

// Topics Routes
api.route("/", topics);

// Articles Routes
api.route("/", articles);

// Comments Routes
api.route("/", comments);

// Server
console.log(`Server is running on port ${PORT}`);

const server = serve({
  fetch: api.fetch,
  port: PORT,
});

export { api, server };
