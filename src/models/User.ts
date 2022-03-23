import { Model } from "@tsed/mongoose";
import { Description, Ignore } from "@tsed/schema";
import { UserCreation } from "./UserCreation";

@Model({ name: "user" })
export class User extends UserCreation {
  @Description("Database assigned id")
  _id: string;

  @Ignore()
  password: string;

  verifyPassword(password: string) {
    return this.password === password;
  }
}
