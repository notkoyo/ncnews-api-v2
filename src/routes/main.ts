import { fetchEndpoints } from "@/model";
import { Hono } from "hono";

const main = new Hono();

main.get("/status", (c) => c.json({ health: true }));
main.get("/endpoints", (c) => fetchEndpoints(c));

export default main;