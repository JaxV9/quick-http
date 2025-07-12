export type Success = "Success";
export type Failure = "Failure";
export type Payload = unknown;

export type ResAction = {
  payload: Payload;
  status: Success | Failure;
  code: number;
};

export class QuickHttp {
  private defaultHeaders: Record<string, string>;
  constructor(
    private baseUrl: string,
    public headers: Record<string, string> = {}
  ) {
    this.defaultHeaders = {
      "Content-Type": "application/json",
      ...headers,
    };
  }

  private async responseManager(response: Response): Promise<ResAction> {
    const data = await response.json();
    if (!response.ok) {
      return {
        payload: data,
        status: "Failure",
        code: data.status,
      };
    }
    return {
      payload: await response.json(),
      status: "Success",
      code: data.status,
    };
  }

  async get(path: string): Promise<ResAction> {
    const response: Response = await fetch(`${this.baseUrl + path}`, {
      method: "GET",
      headers: this.defaultHeaders,
    });
    return this.responseManager(response);
  }

  async post(path: string, payload?: object | null): Promise<ResAction> {
    const response = await fetch(`${this.baseUrl + path}`, {
      method: "POST",
      credentials: "include",
      headers: this.defaultHeaders,
      body: JSON.stringify(payload ?? {}),
    });
    return this.responseManager(response);
  }

  async put(path: string, payload?: object | null): Promise<ResAction> {
    const response = await fetch(`${this.baseUrl + path}`, {
      method: "PUT",
      headers: this.defaultHeaders,
      body: JSON.stringify(payload ?? {}),
    });
    return this.responseManager(response);
  }

  async patch(path: string, payload: object | null): Promise<ResAction> {
    const response = await fetch(`${this.baseUrl + path}`, {
      method: "PATCH",
      headers: this.defaultHeaders,
      body: JSON.stringify(payload ?? {}),
    });
    return this.responseManager(response);
  }
}
