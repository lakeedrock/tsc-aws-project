import { IncomingMessage, ServerResponse } from "http";
import {
  Account,
  Handler,
  HTTP_CODES,
  HTTP_METHODS,
  TokenGenerator,
} from "./Model";
import { Response } from "./Response";

export class LoginHandler implements Handler {
  private req: IncomingMessage;
  private res: ServerResponse;
  private tokenGenerator: TokenGenerator;
  private response: Response;

  constructor(
    req: IncomingMessage,
    res: ServerResponse,
    tokenGenerator: TokenGenerator
  ) {
    this.req = req;
    this.res = res;
    this.tokenGenerator = tokenGenerator;
    this.response = new Response();
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
        this.response.createResponse(
          this.res,
          HTTP_CODES.CREATED,
          sessionToken
        );
      } else {
        const data = {
          message: "Invalid username or password",
        };
        this.response.createResponse(this.res, HTTP_CODES.NOT_FOUND, data);
      }
    } catch (error: any) {
      const data = {
        error: error.message,
      };
      this.response.createResponse(this.res, HTTP_CODES.SERVER_ERROR, data);
    }
  }

  private async handleNotFound(): Promise<void> {
    const data = {
      message: "Not found",
    };
    this.response.createResponse(this.res, HTTP_CODES.NOT_FOUND, data);
  }

  private async getRequestBody(): Promise<Account> {
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
