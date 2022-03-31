import { IncomingMessage, ServerResponse } from "http";
import { UsersDBAccess } from "../User/UsersDBAccess";
import { BaseRequestHandler } from "./BaseRequestHandler";
import { HTTP_METHODS } from "./Model";
import { Utils } from "./Utils";

export class UserHandler extends BaseRequestHandler {
  private usersDBAccess: UsersDBAccess = new UsersDBAccess();

  constructor(req: IncomingMessage, res: ServerResponse) {
    super(req, res);
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
}
