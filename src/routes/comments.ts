import { deleteCommentByCommentId } from "@/model";
import { Hono } from "hono";

const comments = new Hono();

comments.delete("/comments/:comment_id", (c) => deleteCommentByCommentId(c));

export default comments;