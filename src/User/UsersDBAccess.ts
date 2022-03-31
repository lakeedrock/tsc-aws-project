import * as Nedb from "nedb";
import { User } from "../Shared/Model";

export class UsersDBAccess {
  private nedb: Nedb;

  constructor() {
    this.nedb = new Nedb("database/User.db");
    this.nedb.loadDatabase();
  }

  public async putUser(user: User): Promise<void> {
    return new Promise((resolve, reject) => {
      this.nedb.insert(user, (err: Error | null) => {
        if (err) {
          reject(err);
        } else {
          resolve;
        }
      });
    });
  }
}
