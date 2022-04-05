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

  public async getUserById(userId: string): Promise<User | undefined> {
    return new Promise((resolve, reject) => {
      this.nedb.find({ id: userId }, (err: Error | null, docs: User) => {
        if (err) {
          reject(err);
        } else {
          if (Object.keys(docs).length !== 0) {
            resolve(docs);
          } else {
            resolve(undefined);
          }
        }
      });
    });
  }
}
