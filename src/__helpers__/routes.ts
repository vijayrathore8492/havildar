import { Router, Request, Response, NextFunction } from "express";
import HTTPClientError from "../HttpClientError";

type Handler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

type Route = {
  path: string;
  method: string;
  handler: Handler | Handler[];
};

export const applyRoutes = (routes: Route[], router: Router) => {
  for (const route of routes) {
    const { method, path, handler } = route;
    (router as any)[method](path, handler);
  }
};

export const checkRoute = {
  path: "/check",
  method: "get",
  handler: [
    async (_: Request, res: Response) => {
      res.status(200).send("OK");
    }
  ]
};

export const clientError = {
  path: "/clientError",
  method: "get",
  handler: [
    (_: Request, __: Response) => {
      throw new HTTPClientError(400, "bad request");
    }
  ]
};

export const serverError = {
  path: "/serverError",
  method: "get",
  handler: [
    (_: Request, __: Response) => {
      throw new Error("server error");
    }
  ]
};

export const custom412Error = {
  path: "/custom412Error",
  method: "get",
  handler: [
    (_: Request, __: Response) => {
      class Custom412Error extends HTTPClientError {
        constructor( message) {
          super(412, message)
        }
      }

      throw new Custom412Error("custom412Error occurred");
    }
  ]
};