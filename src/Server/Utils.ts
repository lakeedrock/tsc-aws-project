import { parse, URL } from "url";

export class Utils {
  public static getUrlBasePath(url: string | undefined): string {
    if (url) {
      const reqUrl = `${process.env.HOST}:${process.env.PORT}${url}`;
      const parseUrl = new URL(reqUrl);
      return parseUrl.pathname!.split("/")[1];
    } else {
      return "";
    }
  }
}
