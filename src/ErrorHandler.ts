import HTTPClientError from "./HttpClientError";

const tryParseJSON = (jsonString) => {
  try {
    if(typeof jsonString == "object") return jsonString;

    return JSON.parse(jsonString);
  }
  catch (e) { 
    return jsonString;
  }
};

export const notFoundError = () => {
  throw new HTTPClientError({ httpCode: 404, message: { error: "Not found." }});
};

export const clientError = (err: Error, req, res, next, loggerFunction?: Function) => {
  if (err instanceof HTTPClientError) {
    loggerFunction ? loggerFunction(err) : console.error(err);
    res.status(err.httpCode).send(tryParseJSON(err.message));
  } else {
    next(err);
  }
};

export const serverError = (err: Error, req, res, next, loggerFunction?: Function) => {
  loggerFunction ? loggerFunction(err) : console.error(err);
  if (process.env.NODE_ENV === "production") {
    res.status(500).send({ error: "Internal Server Error" });
  } else {
    res.status(500).send({ error: tryParseJSON(err.stack)});
  }
};