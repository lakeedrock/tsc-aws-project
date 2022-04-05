import {
  Account,
  SessionToken,
  TokenGenerator,
  TokenRights,
  TokenState,
  TokenValidator,
} from "../Model";
import { UserCredentialsDBAccess } from "./UserCredentialsDBAccess";
import { v4 as uuidv4 } from "uuid";
import { SessionTokenDBAccess } from "./SessionTokenDBAccess";

export class Authorizer implements TokenGenerator, TokenValidator {
  private userCredentialsDBAccess: UserCredentialsDBAccess =
    new UserCredentialsDBAccess();

  private sessionTokenDBAccess: SessionTokenDBAccess =
    new SessionTokenDBAccess();

  async generateToken(account: Account): Promise<SessionToken | undefined> {
    const resultAccount = await this.userCredentialsDBAccess.getUserCredential(
      account.username,
      account.password
    );

    if (resultAccount) {
      const token: SessionToken = {
        accessRights: resultAccount.accessRights,
        expirationTime: this.getNewExpirationDate(),
        username: resultAccount.username,
        valid: true,
        tokenId: uuidv4(),
      };

      const sessionToken = await this.sessionTokenDBAccess.storeSessionToken(
        token
      );
      return token;
    } else {
      return undefined;
    }
  }

  public async validateToken(tokenId: string): Promise<TokenRights> {
    const token = await this.sessionTokenDBAccess.getToken(tokenId);
    if (!token || !token.valid) {
      const invalidToken: TokenRights = {
        accessRights: [],
        state: TokenState.INVALID,
      };
      return invalidToken;
    } else if (token.expirationTime < new Date()) {
      const expiredToken: TokenRights = {
        accessRights: [],
        state: TokenState.EXPIRED,
      };
      return expiredToken;
    } else {
      const validToken: TokenRights = {
        accessRights: token.accessRights,
        state: TokenState.VALID,
      };
      return validToken;
    }
  }

  private getNewExpirationDate(): Date {
    return new Date(Date.now() + 60 * 60 * 1000);
  }
}
