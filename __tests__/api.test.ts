import { api, server } from "@/index";
import * as fs from "fs/promises";
import { Endpoints, Articles, Comments, Users, Topics } from "@/api";
import { execSync } from "child_process";

afterAll(() => server.close());

describe("GET", () => {
  describe("/status", () => {
    it("should return json object about the health", async () => {
      const res = await api.request("/api/v2/status");
      const result = await res.json();
      expect(result).toEqual({ health: "Server is healthy." });
    });
    it("should return status code 200", async () => {
      const res = await api.request("/api/v2/status");
      expect(res.status).toBe(200);
    });
  });

  describe("/endpoints", () => {
    it("should return json object with all endpoints", async () => {
      const endpoints = await fs.readFile("./src/endpoints.json", "utf-8");
      const parsedEndpoints: Endpoints = JSON.parse(endpoints);
      const res = await api.request("/api/v2/endpoints");
      const result = await res.json();
      expect(result).toEqual(parsedEndpoints);
    });
    it("should return status code 200", async () => {
      const res = await api.request("/api/v2/endpoints");
      expect(res.status).toBe(200);
    });
  });

  describe("/users", () => {
    it("should return json object with all users in database", async () => {
      const res = await api.request("/api/v2/users");
      const users: Users[] = await res.json();
      expect(users.length).toBeGreaterThan(0);
      users.forEach((user) => {
        expect(Object.keys(user).length).toBe(4);
        ["username", "first_name", "last_name", "avatar_url"].forEach((prop) =>
          expect(user).toHaveProperty(prop)
        );
      });
    });
    it("should return status code 200", async () => {
      const res = await api.request("/api/v2/users");
      expect(res.status).toBe(200);
    });
  });

  describe("/topics", () => {
    it("should return json object with all topics in database", async () => {
      const res = await api.request("/api/v2/topics");
      const topics: Topics[] = await res.json();
      expect(topics.length).toBeGreaterThan(0);
      topics.forEach((topic) => {
        expect(Object.keys(topic).length).toBe(2);
        ["slug", "description"].forEach((prop) =>
          expect(topic).toHaveProperty(prop)
        );
      });
    });
    it("should return status code 200", async () => {
      const res = await api.request("/api/v2/topics");
      expect(res.status).toBe(200);
    });
  });

  describe("/articles", () => {
    it("should return json object with all articles in database", async () => {
      const res = await api.request("/api/v2/articles");
      const articles: Articles[] = await res.json();
      expect(articles.length).toBeGreaterThan(0);
      articles.forEach((article) => {
        expect(Object.keys(article).length).toBe(8);
        [
          "article_id",
          "title",
          "topic",
          "author",
          "body",
          "created_at",
          "votes",
          "article_img_url",
        ].forEach((prop) => expect(article).toHaveProperty(prop));
      });
    });
    it("should return status code 200", async () => {
      const res = await api.request("/api/v2/articles");
      expect(res.status).toBe(200);
    });
  });

  describe("/articles/:id", () => {
    it("should return an array of a json object of the article with all keys present", async () => {
      const id: number = 1;
      const res = await api.request(`/api/v2/articles/${id}`);
      const article: Articles[] = await res.json();
      expect(article.length).toBeGreaterThan(0);
      article.forEach((article) => {
        expect(Object.keys(article).length).toBe(8);
        [
          "article_id",
          "title",
          "topic",
          "author",
          "body",
          "created_at",
          "votes",
          "article_img_url",
        ].forEach((prop) => expect(article).toHaveProperty(prop));
      });
    });
    it("should return article with correct id", async () => {
      const id: number = 1;
      const res = await api.request(`/api/v2/articles/${id}`);
      const article: Articles[] = await res.json();
      expect(article[0]).toHaveProperty("article_id");
      expect(article[0].article_id).toBe(id);
    });
    it("should return status code 200", async () => {
      const res = await api.request("/api/v2/articles/1");
      expect(res.status).toBe(200);
    });
    it("should return status code 404 if article does not exist", async () => {
      const res = await api.request("/api/v2/articles/999");
      expect(res.status).toBe(404);
    });
  });

  describe("/articles/:id/comments", () => {
    it("should return an array of json objects of all comments for specified id", async () => {
      const res = await api.request("/api/v2/articles/1/comments");
      const comments: Comments[] = await res.json();

      expect(comments.length).toBeGreaterThan(0);
      comments.forEach((comment) => {
        expect(Object.keys(comment).length).toBe(6);
        [
          "comment_id",
          "body",
          "article_id",
          "author",
          "votes",
          "created_at",
        ].forEach((prop) => expect(comment).toHaveProperty(prop));
      });
    });
    it("should return status code 200", async () => {
      const res = await api.request("/api/v2/articles/1/comments");
      expect(res.status).toBe(200);
    });
    it("should return status code 404 if article does not exist or no comments available", async () => {
      const res = await api.request("/api/v2/articles/999/comments");
      expect(res.status).toBe(404);
    });
  });
});

describe("POST", () => {
  describe("/articles/:id/comments", () => {
    it("should return array of json object with comment that was added", async () => {
      const comment = {
        username: "tickle122",
        body: "Even nicer article!",
      };
      const article_id: number = 5;

      const res = await api.request(`/api/v2/articles/${article_id}/comments`, {
        method: "POST",
        body: JSON.stringify(comment),
        headers: new Headers({ "Content-Type": "application/json" }),
      });
      const addedComment: Comments[] = await res.json();

      expect(addedComment[0]).toHaveProperty("comment_id");
      expect(addedComment[0].article_id).toEqual(article_id);
      expect(addedComment[0].body).toEqual(comment.body);
      expect(addedComment[0].author).toEqual(comment.username);
    });
    it("should return status code 201", async () => {
      const comment = {
        username: "tickle122",
        body: "Even nicer article!",
      };
      const article_id: number = 6;

      const res = await api.request(`/api/v2/articles/${article_id}/comments`, {
        method: "POST",
        body: JSON.stringify(comment),
        headers: new Headers({ "Content-Type": "application/json" }),
      });
      expect(res.status).toBe(201);
    });
  });
});

describe("PATCH", () => {
  describe("/articles/:id", () => {
    it("should return the modified article", async () => {
      const body = {
        title: "This title was changed",
      }
      const res = await api.request("/api/v2/articles/4", {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: new Headers({ "Content-Type": "application/json" }),
      })
      const updatedArticle = await res.json();
      expect(updatedArticle[0].title).toEqual(body.title);
    });
    it("should return status code 200", async () => {
      const body = {
        title: "This title was changed again",
      }
      const res = await api.request("/api/v2/articles/4", {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: new Headers({ "Content-Type": "application/json" }),
      });
      expect(res.status).toBe(200);
    });
  });
});

describe("DELETE", () => {
  describe("/comments/:id", () => {
    it("should return json object with deleted comment, author and ID", async () => {
      const comment = {
        username: "tickle122",
        body: "Even nicer article!",
      };
      const article_id: number = 7;
      const commentCreated = await api.request(`/api/v2/articles/${article_id}/comments`, {
        method: "POST",
        body: JSON.stringify(comment),
        headers: new Headers({ "Content-Type": "application/json" }),
      });
      const json: Comments[] = await commentCreated.json();
      
      const comment_id: number = json[0].comment_id;
      const res = await api.request(`/api/v2/comments/${comment_id}`, {
        method: "DELETE",
      });
      const deletedComment = await res.json();
      expect(deletedComment).toHaveProperty("message");
      expect(deletedComment).toHaveProperty("comment");
      expect(deletedComment).toHaveProperty("author");
      expect(deletedComment.message).toEqual(`Comment with ID: ${comment_id} deleted.`);
    });
    it("should return status code 200", async () => {
      const comment = {
        username: "tickle122",
        body: "Even nicer article!",
      };
      const article_id: number = 7;
      const commentCreated = await api.request(`/api/v2/articles/${article_id}/comments`, {
        method: "POST",
        body: JSON.stringify(comment),
        headers: new Headers({ "Content-Type": "application/json" }),
      });
      const json: Comments[] = await commentCreated.json();
      
      const comment_id: number = json[0].comment_id;
      const res = await api.request(`/api/v2/comments/${comment_id}`, {
        method: "DELETE",
      });
      expect(res.status).toBe(202);
    });
  });
});
