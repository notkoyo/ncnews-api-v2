import { fetchUsers } from "@/model";
import { Hono } from "hono";

const users = new Hono();

users.get("/users", (c) => fetchUsers(c));

export default users;