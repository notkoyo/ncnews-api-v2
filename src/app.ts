import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import { main, users, topics, articles, comments } from "@/api/routes/all";

const api = new Hono().basePath("/api/v2");

api.use(prettyJSON());
api.use("/api/v2/*", cors());

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

serve({
  fetch: api.fetch,
  port,
});

export default api;
