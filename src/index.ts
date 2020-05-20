import * as ErrorHandler from "./ErrorHandler";

const handle404Error = (router) => {
  router.use(() => {
    ErrorHandler.notFoundError();
  });
};

const handleClientError = (router, loggerFunction?: Function) => {
  router.use((err: Error, req, res, next) => {
    ErrorHandler.clientError(err, req, res, next, loggerFunction);
  });
};

const handleServerError = (router, loggerFunction?: Function) => {
  router.use((err: Error, req, res, next) => {
    ErrorHandler.serverError(err, req, res, next, loggerFunction);
  });
};

// Havildar
export default (router, loggerFunction?: Function) => {
  handle404Error(router);
  handleClientError(router, loggerFunction);
  handleServerError(router, loggerFunction);
}
