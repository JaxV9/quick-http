# Welcome to Quick-Http

This package is a fast way to do http request for new projects.

First you need to initialize the class to use the methods.

```ts
const baseUrl = "www.yourwebsite.com";
const headers = {
  Authorization: "Bearer ...",
  "X-Custom-Header": "MyAppClient",
  Cookie: "sessionId=abc123xyz",
};
const quickHttp = new QuickHttp(baseUrl, headers);
```

Then make the request you want.

```ts
const response: ResAction = await quickHttp.get("api/something");

const response: ResAction = await quickHttp.post("api/something", payload);

const response: ResAction = await quickHttp.put("api/something", payload);

const response: ResAction = await quickHttp.patch("api/something", payload);
```

More details about the types...

```ts
export type Success = "Success";
export type Failure = "Failure";
export type Payload = unknown;

export type ResAction = {
  payload: Payload;
  status: Success | Failure;
  code: number;
};
```
