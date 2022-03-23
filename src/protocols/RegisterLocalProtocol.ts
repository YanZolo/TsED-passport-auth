import { BodyParams, Req } from "@tsed/common";
import { OnVerify, Protocol } from "@tsed/passport";
// import {OnInstall} from "@tsed/passport";
import { Strategy } from "passport-local";
import { Forbidden } from "@tsed/exceptions";
import { UserCreation } from "../models/UserCreation";
import { UsersService } from "../services/users/UsersServices";

@Protocol({
  name: "signup",
  useStrategy: Strategy,
  settings: {
    usernameField: "email",
    passwordField: "password"
  }
})
export class SignupLocalProtocol implements OnVerify {
  constructor(private usersService: UsersService) {}

  async $onVerify(@Req() request: Req, @BodyParams() user: UserCreation) {
    const { email } = user;
    const found = await this.usersService.findOne({ email });

    if (found) {
      throw new Forbidden("Email is already registered");
    }

    return this.usersService.create(user);
  }

  //   $onInstall(strategy: Strategy): void {
  //     // intercept the strategy instance to adding extra configuration
  //   }
}
