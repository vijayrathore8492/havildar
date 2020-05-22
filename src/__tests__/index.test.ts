import havildar from '../index';
import express, { Router } from "express";
import request from "supertest";
import { checkRoute, clientError, serverError, custom412Error, applyRoutes } from "../__helpers__/routes";

describe("check", () => {
  let router: Router;

  beforeAll(() => {
    router = express();
    applyRoutes([checkRoute, clientError, custom412Error, serverError], router);
    havildar(router);
  });

  test("valid endpoint", async () => {
    const response = await request(router).get("/check");
    expect(response.status).toEqual(200);
  });

  test("404 endpoint", async () => {
    const response = await request(router).get("/notcheck");
    expect(response.status).toEqual(404);
    expect(response.body).toEqual({"error": "Not found."});
  });

  test("default client error", async () => {
    const response = await request(router).get("/clientError");
    expect(response.status).toEqual(400);
    expect(response.body).toEqual({"error": "bad request"});
  });

  test("custom412Error client error", async () => {
    const response = await request(router).get("/custom412Error");
    expect(response.status).toEqual(412);
    expect(response.body).toEqual({"error": "custom412Error occurred"});
  });

  describe("when on prod", () => {
    beforeEach(() => {
      process.env.NODE_ENV = "production";
    })

    test("server error", async () => {
      const response = await request(router).get("/serverError");
      expect(response.status).toEqual(500);
      expect(response.body).toEqual({"error": "Internal Server Error"});
    });
  })
});