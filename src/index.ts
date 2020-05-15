import { Router, Request, Response, NextFunction } from "express";
import * as ErrorHandler from "./ErrorHandler";

const handle404Error = (router: Router) => {
  router.use(() => {
    ErrorHandler.notFoundError();
  });
};

const handleClientError = (router: Router) => {
  router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    ErrorHandler.clientError(err, req, res, next);
  });
};

const handleServerError = (router: Router) => {
  router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    ErrorHandler.serverError(err, req, res, next);
  });
};

// Havildar
export default (router: Router) => {
  handle404Error(router);
  handleClientError(router);
  handleServerError(router);
}
