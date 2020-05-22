type HttpErrorArguments = { httpCode?: number; message: object | string }

export default class HTTPClientError extends Error {
  httpCode!: number;
  name!: string;
  
  constructor({ httpCode, message }: HttpErrorArguments) {
    if (message instanceof Object) {
      super(JSON.stringify(message));
    } else {
      super(message);
    }
    this.httpCode = httpCode || 200;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}