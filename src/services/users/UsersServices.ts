import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { User } from "../../models/User";
import { UserCreation } from "src/models/UserCreation";

@Injectable()
export class UsersService {
  @Inject(User) private readonly userModel: MongooseModel<User>;
  @Inject(UserCreation) private readonly userCreationModel: MongooseModel<UserCreation>;

  async create(payload: UserCreation) {
    const newUser = await new this.userCreationModel(payload);
    return await newUser.save();
  }
  findOne({ _id: id }: Record<string, string>) {
    return this.userModel.findById(id);
  }
}
