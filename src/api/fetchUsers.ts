import { Context } from "hono";
import db from "@/db/database";
import { users } from "@/db/schema";



const fetchUsers = async (c: Context) => {
  const allUsers = await db.select().from(users);
  
  return c.json(allUsers);
};

export default fetchUsers;