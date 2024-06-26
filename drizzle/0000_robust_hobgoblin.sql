CREATE TABLE IF NOT EXISTS "articles" (
	"article_id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"topic" text NOT NULL,
	"author" text NOT NULL,
	"body" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"votes" integer DEFAULT 0 NOT NULL,
	"article_img_url" text DEFAULT 'https://images.pexels.com/photos/97050/pexels-photo-97050.jpeg?w=700&h=700'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comments" (
	"comment_id" serial PRIMARY KEY NOT NULL,
	"body" text NOT NULL,
	"article_id" integer NOT NULL,
	"author" text NOT NULL,
	"votes" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "topics" (
	"slug" text PRIMARY KEY NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"username" text PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"avatar_url" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "articles" ADD CONSTRAINT "articles_topic_topics_slug_fk" FOREIGN KEY ("topic") REFERENCES "public"."topics"("slug") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "articles" ADD CONSTRAINT "articles_author_users_username_fk" FOREIGN KEY ("author") REFERENCES "public"."users"("username") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments" ADD CONSTRAINT "comments_article_id_articles_article_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."articles"("article_id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments" ADD CONSTRAINT "comments_author_users_username_fk" FOREIGN KEY ("author") REFERENCES "public"."users"("username") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
