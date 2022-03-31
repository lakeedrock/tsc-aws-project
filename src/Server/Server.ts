import { createServer, IncomingMessage, ServerResponse } from "http";
import { url } from "inspector";
import { Authorizer } from "./Authorization/Authorizer";
import { LoginHandler } from "./LoginHandler";
import { UserHandler } from "./UsersHandler";
import { Utils } from "./Utils";

export class Server {
  private authorizer: Authorizer = new Authorizer();

  public createServer() {
    createServer(async (req: IncomingMessage, res: ServerResponse) => {
      console.log(`Got request from : ${req.method}`);
      const basePath = Utils.getUrlBasePath(req.url);
      switch (basePath) {
        case "login":
          await new LoginHandler(req, res, this.authorizer).handleRequest();
          break;
        case "users":
          await new UserHandler(req, res).handleRequest();
          break;
        default:
          break;
      }
      res.end();
    }).listen(process.env.PORT);
    console.log(`Server started at ${process.env.HOST}:${process.env.PORT}`);
  }
}
