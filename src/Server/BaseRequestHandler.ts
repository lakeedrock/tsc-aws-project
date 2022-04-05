import { IncomingMessage, ServerResponse } from "http";
import { Account, HTTP_CODES } from "./Model";

export abstract class BaseRequestHandler {
  protected req: IncomingMessage;
  protected res: ServerResponse;
  protected response: Response;

  constructor(req: IncomingMessage, res: ServerResponse) {
    this.req = req;
    this.res = res;
    this.response = new Response();
  }

  abstract handleRequest(): Promise<void>;

  protected async handleNotFound(): Promise<void> {
    const data = {
      message: "Not found",
    };
    this.createJSONResponse(this.res, HTTP_CODES.NOT_FOUND, data);
  }

  protected async getRequestBody(): Promise<Account> {
    return new Promise((resolve, reject) => {
      let body = "";
      this.req.on("data", (data: string) => {
        body += data;
      });
      this.req.on("end", () => {
        try {
          resolve(JSON.parse(body));
        } catch (error: any) {
          reject(error);
        }
      });
      this.req.on("error", (error: any) => {
        reject(error);
      });
    });
  }

  protected createJSONResponse(
    res: ServerResponse,
    statusCode: HTTP_CODES,
    data: Object
  ): ServerResponse {
    res.statusCode = statusCode;
    res.writeHead(statusCode, {
      "Content-Type": "application.json",
    });
    res.write(JSON.stringify(data));
    return res;
  }
}
