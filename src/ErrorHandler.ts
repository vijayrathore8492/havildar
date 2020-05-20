import HTTPClientError from "./HttpClientError";

const tryParseJSON = (jsonString) => {
  try {
    jsonString = jsonString || {};
    return (typeof jsonString == "object") ? jsonString : JSON.parse(jsonString) ;
  }
  catch (e) { 
    return jsonString;
  }
};

export const notFoundError = () => {
  throw new HTTPClientError(404, "Not found.");
};

export const clientError = (err: Error, req, res, next, loggerFunction?: Function) => {
  if (err instanceof HTTPClientError) {
    loggerFunction ? loggerFunction(err) : console.error(err);
    res.status(err.statusCode).send({code: err.statusCode, error: tryParseJSON(err.message)});
  } else {
    next(err);
  }
};

export const serverError = (err: Error, req, res, next, loggerFunction?: Function) => {
  loggerFunction ? loggerFunction(err) : console.error(err);
  if (process.env.NODE_ENV === "production") {
    res.status(500).send({code: 500, error: "Internal Server Error"});
  } else {
    res.status(500).send({code: 500, error: tryParseJSON(err.stack)});
  }
};