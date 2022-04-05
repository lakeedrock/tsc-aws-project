import { IncomingMessage, ServerResponse } from "http";
import { BaseRequestHandler } from "./BaseRequestHandler";
import { HTTP_CODES, HTTP_METHODS, TokenGenerator } from "./Model";

export class LoginHandler extends BaseRequestHandler {
  private tokenGenerator: TokenGenerator;

  constructor(
    req: IncomingMessage,
    res: ServerResponse,
    tokenGenerator: TokenGenerator
  ) {
    super(req, res);
    this.tokenGenerator = tokenGenerator;
  }

  public async handleRequest(): Promise<void> {
    switch (this.req.method) {
      case HTTP_METHODS.POST:
        await this.handlePost();
        break;
      default:
        await this.handleNotFound();
        break;
    }
  }

  private async handlePost(): Promise<void> {
    try {
      const body = await this.getRequestBody();
      const sessionToken = await this.tokenGenerator.generateToken(body);
      if (sessionToken) {
        this.createJSONResponse(this.res, HTTP_CODES.CREATED, sessionToken);
      } else {
        const data = {
          message: "Invalid username or password",
        };
        this.createJSONResponse(this.res, HTTP_CODES.NOT_FOUND, data);
      }
    } catch (error: any) {
      const data = {
        error: error.message,
      };
      this.createJSONResponse(this.res, HTTP_CODES.SERVER_ERROR, data);
    }
  }
}
