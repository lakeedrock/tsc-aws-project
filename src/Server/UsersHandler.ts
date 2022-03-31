import { IncomingMessage, ServerResponse } from "http";
import { stringify } from "querystring";
import { UsersDBAccess } from "../User/UsersDBAccess";
import { Handler, HTTP_CODES, HTTP_METHODS } from "./Model";
import { Response } from "./Response";
import { Utils } from "./Utils";

export class UserHandler implements Handler {
  private req: IncomingMessage;
  private res: ServerResponse;
  private response: Response;
  private usersDBAccess: UsersDBAccess = new UsersDBAccess();

  constructor(req: IncomingMessage, res: ServerResponse) {
    this.req = req;
    this.res = res;
    this.response = new Response();
  }

  public async handleRequest(): Promise<void> {
    switch (this.req.method) {
      case HTTP_METHODS.GET:
        await this.handleGet();
        break;
      default:
        this.handleNotFound();
        break;
    }
  }

  private async handleGet() {
    const parsedUrl = Utils.getUrlParams(this.req.url);
    if (parsedUrl) {
      const params = {} as any;
      parsedUrl.searchParams.forEach((value, name) => {
        params[name] = value;
      });
    }
  }

  private async handleNotFound(): Promise<void> {
    const data = {
      message: "Not found",
    };
    this.response.createResponse(this.res, HTTP_CODES.NOT_FOUND, data);
  }
}
