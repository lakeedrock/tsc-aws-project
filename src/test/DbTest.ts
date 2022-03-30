import { UserCredentialsDBAccess } from "../Server/Authorization/UserCredentialsDBAccess";
import { AccessRight } from "../Shared/Model";

class DbTest {
  public dbAccess: UserCredentialsDBAccess = new UserCredentialsDBAccess();
}

new DbTest().dbAccess.putUserCredentials({
  username: "user1",
  password: "abcd",
  accessRights: [0, 1, 2, 3],
});
