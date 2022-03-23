import { Model } from "@tsed/mongoose";
import { Required, Description } from "@tsed/schema";
import { Credentials } from "./Credentials";

@Model({ name: "user" })
export class UserCreation extends Credentials {
  @Description("User first name")
  @Required()
  firstName: string;

  @Description("User last name")
  @Required()
  lastName: string;

  @Description("User phonenumber")
  phone: string;

  @Description("User address")
  address: string;
}
