
# Havildar - An Error middleware for express js

## Wyy to Use

1. It has inbuilt HTTPClientError class, which you can use to create custom error classes.

2. It has default 404 handler.

3. It catches all run time errors and sends proper HTTP compatible response.

4. It saves your process from unwanted restarts.

5. By default it logs errors with `console.error`, however you can provide your own logger function that will be called when error occurred.

6. Supports REST Api error codes.

## Setup

### Install

```bash
npm install --save havildar
```

### How to use

#### add to your express app

```javascript
const havildar = require('havildar');
```

OR

```typescript
import havildar from 'havildar';
```

#### Add as middleware in your server file

```javascript
const router = express();
/**
 * Add error handler after routes
 **/
havildar(router);
```

Or to use with custom logger function

```javascript
havildar(router, logger.error);
```

This will enable `havildar` to catch and render all errors.

IMP: Set `NODE_ENV=production` to avoid sending error stack trace of unknown errors in response.

#### Throw client error from anywhere in the code

```javascript
import HTTPClientError from 'havildar/lib/HttpClientError'
/**
 * Code in between
 **/
throw new HTTPClientError({ httpCode: 400, message: { error: "bad request" }});
//Status: 400 ; Response { error: "bad request" }

// OR with 200 http status
throw new HTTPClientError({ message: { code: "1232", error: "bad request" }});
//Status:200 ; Response { code: "1232", error: "bad request" }

```

#### Use Error classes to create custom errors

```javascript
import HTTPClientError from 'havildar/lib/HttpClientError'
```

OR

```javascript
const HTTPClientError = require('havildar/lib/HttpClientError');
```

Create custom Error class.

```javascript
import HTTPClientError from 'havildar/lib/HttpClientError'

export class HTTP400Error extends HTTPClientError {
  constructor(message: string | object = "Bad Request") {
    super({ httpCode: 400, message: message });
  }
}
```

Throw anywhere suitable. It will be caught, logged and rendered by `havildar`.

```javascript
throw new HTTP400Error({ error: "invalid email address!" })
```

You API response will be rendered correctly with HTTP status 400.

```json
{ "error" : "invalid email address!" }
```

## Source Code/ Reporting issue

Go to <https://github.com/vijayrathore8492/havildar>