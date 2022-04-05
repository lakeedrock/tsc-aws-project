import { AccessRight } from "../Shared/Model";

export interface Account {
  username: string;
  password: string;
}

export interface SessionToken {
  tokenId: string;
  username: string;
  valid: boolean;
  expirationTime: Date;
  accessRights: AccessRight[];
}

export interface TokenGenerator {
  generateToken(account: Account): Promise<SessionToken | undefined>;
}

export enum HTTP_CODES {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

export enum HTTP_METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export interface TokenValidator {
  validateToken(tokenId: string): Promise<TokenRights>;
}

export interface TokenRights {
  accessRights: AccessRight[];
  state: TokenState;
}

export enum TokenState {
  VALID,
  INVALID,
  EXPIRED,
}
