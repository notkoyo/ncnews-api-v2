import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import { main, users, topics, articles, comments } from "@/routes/all";

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
const port = 8080;
console.log(`Server is running on port ${port}`);

const server = serve({
  fetch: api.fetch,
  port,
});

export { api, server };
