import { IncomingMessage, ServerResponse } from "http";
import { Account, HTTP_CODES } from "./Model";
import { Response } from "./Response";

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
    this.response.createResponse(this.res, HTTP_CODES.NOT_FOUND, data);
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
}
