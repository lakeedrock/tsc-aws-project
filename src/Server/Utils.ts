import { IncomingMessage } from "http";
import { parse, URL, UrlWithParsedQuery } from "url";

export class Utils {
  public static getUrlBasePath(url: string | undefined): string {
    if (url) {
      const parseUrl = new URL(url, this.getServerURL());
      return parseUrl.pathname!.split("/")[1];
    } else {
      return "";
    }
  }

  public static getUrlParams(url: string | undefined): URL | undefined {
    if (url) {
      const parseUrl = new URL(url, this.getServerURL());
      return parseUrl;
    } else {
      return undefined;
    }
  }

  private static getServerURL(): string {
    return `${process.env.HOST}:${process.env.PORT}`;
  }
}
