import { IncomingMessage, ServerResponse } from "http";
import { User } from "../Shared/Model";
import { UsersDBAccess } from "../User/UsersDBAccess";
import { BaseRequestHandler } from "./BaseRequestHandler";
import { HTTP_CODES, HTTP_METHODS } from "./Model";
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

  private async handleGet(): Promise<void> {
    const parsedUrl = Utils.getUrlParams(this.req.url);
    if (parsedUrl) {
      const userId = parsedUrl.searchParams.get("id");
      if (userId) {
        const user = await this.usersDBAccess.getUserById(userId);
        if (user) {
          this.createJSONResponse(this.res, HTTP_CODES.OK, user);
        } else {
          const data = {
            message: "User not found",
          };
          this.createJSONResponse(this.res, HTTP_CODES.NOT_FOUND, data);
        }
      } else {
        const data = {
          message: "Cannot find user id in request",
        };
        this.createJSONResponse(this.res, HTTP_CODES.BAD_REQUEST, data);
      }
    } else {
      const data = {
        message: "Invalid url",
      };
      this.createJSONResponse(this.res, HTTP_CODES.BAD_REQUEST, data);
    }
  }
}
