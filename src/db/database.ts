import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { config } from "dotenv";
import { ExtendedEnv } from '@/api';
config();

const { DATABASE_URL } = process.env as ExtendedEnv;

const sql = neon(DATABASE_URL!);

const db = drizzle(sql);

export default db;