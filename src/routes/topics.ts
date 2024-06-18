import { fetchTopics } from "@/model";
import { Hono } from "hono";

const topics = new Hono();

topics.get("/topics", (c) => fetchTopics(c));

export default topics;