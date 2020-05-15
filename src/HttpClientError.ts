export default class HTTPClientError extends Error {
  statusCode!: number;
  name!: string;
  
  constructor(code: number, message: object | string) {
    if (message instanceof Object) {
      super(JSON.stringify(message));
    } else {
      super(message);
    }
    this.statusCode = code;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}