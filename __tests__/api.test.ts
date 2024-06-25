import { api, server } from "@/index";
import * as fs from "fs/promises";
import { Endpoints, Articles, Comments } from "@/api";

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
      const users: Object[] = await res.json();
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
      const topics: Object[] = await res.json();
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
