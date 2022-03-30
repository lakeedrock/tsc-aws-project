import { ServerResponse } from "http";
import { HTTP_CODES } from "./Model";

export class Response {
  public createResponse(
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
