import { BodyParams, Controller, Get, Post, Req } from "@tsed/common";
import { Authenticate, Authorize } from "@tsed/passport";
import { Credentials } from "../../models/Credentials";
import { User } from "../../models/User";
import { UserCreation } from "../../models/UserCreation";
import { Returns, Security } from "@tsed/schema";

@Controller("/auth")
export class PassportCtrl {
  @Post("/login")
  @Authenticate("login", { failWithError: false })
  @Returns(200, User)
  @Returns(400).Description("Validation error")
  login(@Req() req: Req, @BodyParams() credentials: Credentials) {
    return req.user;
  }

  @Post("/register")
  @Returns(201, User)
  @Authenticate("register")
  signup(@Req() req: Req, @BodyParams() user: UserCreation) {
    return req.user;
  }

  @Get("/userinfo")
  @Authenticate("basic")
  @Security("auth:basic")
  @Returns(200, User)
  getUserInfo(@Req() req: Req): any {
    return req.user;
  }

  @Get("/logout")
  logout(@Req() req: Req) {
    req.logout();
  }

  @Get("/connect/:protocol")
  @Authorize(":protocol")
  @Returns(200, User)
  connectProtocol(@Req() req: Req): any {
    return req.user;
  }

  @Get("/connect/:protocol/callback")
  @Authorize(":protocol")
  @Returns(200, User)
  connectProtocolCallback(@Req() req: Req): any {
    return req.user;
  }
}
