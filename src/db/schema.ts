import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  username: text("username").notNull().primaryKey(),
  first_name: text("first_name").notNull(),
  last_name: text("last_name").notNull(),
  avatar_url: text("avatar_url"),
});

export const topics = pgTable("topics", {
  slug: text("slug").primaryKey().notNull(),
  description: text("description"),
});

export const articles = pgTable("articles", {
  article_id: serial("article_id").primaryKey(),
  title: text("title").notNull(),
  topic: text("topic")
    .references(() => topics.slug, { onDelete: "cascade", onUpdate: "cascade" })
    .notNull(),
  author: text("author")
    .references(() => users.username, { onDelete: "cascade", onUpdate: "cascade" })
    .notNull(),
  body: text("body").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  votes: integer("votes").default(0).notNull(),
  article_img_url: text("article_img_url").default(
    "https://images.pexels.com/photos/97050/pexels-photo-97050.jpeg?w=700&h=700"
  ),
});

export const comments = pgTable("comments", {
  comment_id: serial("comment_id").primaryKey(),
  body: text("body").notNull(),
  article_id: integer("article_id")
    .references(() => articles.article_id, { onDelete: "cascade", onUpdate: "cascade" })
    .notNull(),
  author: text("author")
    .references(() => users.username, { onDelete: "cascade", onUpdate: "cascade" })
    .notNull(),
  votes: integer("votes").default(0).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});
