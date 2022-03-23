import { BodyParams, Req } from "@tsed/common";
import { OnVerify, Protocol } from "@tsed/passport";
// import {OnInstall} from "@tsed/passport";
import { IStrategyOptions, Strategy } from "passport-local";
import { Credentials } from "../models/Credentials";
import { UsersService } from "../services/users/UsersServices";

@Protocol<IStrategyOptions>({
  name: "login",
  useStrategy: Strategy,
  settings: {
    usernameField: "email",
    passwordField: "password"
  }
})
export class LoginLocalProtocol implements OnVerify {
  constructor(private usersService: UsersService) {}

  async $onVerify(@Req() request: Req, @BodyParams() credentials: Credentials) {
    const { email, password } = credentials;

    const user = await this.usersService.findOne({ email });

    if (!user) {
      return false;
      // OR throw new NotAuthorized("Wrong credentials")
    }

    if (!user.verifyPassword(password)) {
      return false;
      // OR throw new NotAuthorized("Wrong credentials")
    }

    return user;
  }

  //   $onInstall(strategy: Strategy): void {
  //     // intercept the strategy instance to adding extra configuration
  //   }
}
