import db from "@/db/database";
import { users, topics, articles, comments } from "./schema";
import {
  usersData,
  topicsData,
  articlesData,
  commentsData,
} from "./data/index";
import timestampToDate from "@/utils/timestampToDate";

(async () => {
  try {
    console.log("Seeding database...");

    await Promise.all(
      usersData.map((user) =>
        db.insert(users).values({
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
          avatar_url: user.avatar_url,
        })
      )
    );

    await Promise.all(
      topicsData.map((topic) =>
        db.insert(topics).values({
          slug: topic.slug,
          description: topic.description,
        })
      )
    );

    await Promise.all(
      articlesData.map((article) =>
        db.insert(articles).values({
          title: article.title,
          topic: article.topic,
          author: article.author,
          body: article.body,
          created_at: timestampToDate(article.created_at),
          votes: article.votes,
          article_img_url: article.article_img_url,
        })
      )
    );

    await Promise.all(
      commentsData.map((comment) =>
        db.insert(comments).values({
          body: comment.body,
          votes: comment.votes,
          author: comment.author,
          article_id: comment.article_id,
          created_at: timestampToDate(comment.created_at),
        })
      )
    );

    console.log("Database seeded successfully.");
  } catch (error) {
    console.error(error);
  }
})();
