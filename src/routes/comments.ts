import { Hono } from "hono";

const comments = new Hono();

comments.delete("/api/v2/comments/:comment_id", (c) =>
  c.json({ comment: "Deleted Comment" })
);

export default comments;