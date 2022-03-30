import { Account } from "../Server/Model";

export enum AccessRight {
  CREATE = 0,
  READ = 1,
  UPDATE = 2,
  DELETE = 4,
}

export interface UserCredentials extends Account {
  accessRights: AccessRight[];
}
