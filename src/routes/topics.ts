import { fetchTopics } from "@/api/mvc";
import { Hono } from "hono";

const topics = new Hono();

topics.get("/topics", (c) => fetchTopics(c));

export default topics;