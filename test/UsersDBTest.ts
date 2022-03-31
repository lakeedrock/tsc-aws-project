import { WorkingPosition } from "../src/Shared/Model";
import { UsersDBAccess } from "../src/User/UsersDBAccess";

class UsersDBTest {
  public userDBAccess: UsersDBAccess = new UsersDBAccess();
}

new UsersDBTest().userDBAccess.putUser({
  age: 30,
  email: "lakshan@gmail.com",
  id: "adsc4353323",
  name: "Lakshan Costa",
  workingPosition: WorkingPosition.PROGRAMMER,
});
