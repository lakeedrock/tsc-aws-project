import { UserCredentials } from "../../Shared/Model";
import * as Nedb from "nedb";

export class UserCredentialsDBAccess {
  private nedb: Nedb;

  constructor() {
    this.nedb = new Nedb("database/UserCredentials.db");
    this.nedb.loadDatabase();
  }

  public async putUserCredentials(
    UserCredentials: UserCredentials
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.nedb.insert(UserCredentials, (err: Error | null, doc: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(doc);
        }
      });
    });
  }

  public async getUserCredential(
    username: string,
    password: string
  ): Promise<UserCredentials | undefined> {
    return new Promise((resolve, reject) => {
      this.nedb.find(
        { username: username, password: password },
        (err: Error | null, docs: UserCredentials[]) => {
          if (err) {
            reject(err);
          } else {
            if (docs.length == 0) {
              resolve(undefined);
            } else {
              resolve(docs[0]);
            }
          }
        }
      );
    });
  }
}
