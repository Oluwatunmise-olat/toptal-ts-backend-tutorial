import { CreateUserDto, PatchUserDto, PutUserDto } from "../dto/index";
import mongooseService from "../../common/services/mongoose.service";

class UsersDao {
  private _mongoose = mongooseService.getMongoose();
  private Schema = this._mongoose.Schema;
  private userSchema = new this.Schema(
    {
      email: String,
      password: {
        type: String,
        select: false
      },
      firstName: String,
      lastName: String,
      permissionFlags: Number
    },
    { id: false }
  );

  public User = this._mongoose.model("Users", this.userSchema);

  constructor() {}

  async create(userFields: CreateUserDto) {
    const user = new this.User({
      ...userFields,
      permissionFlags: 1
    });
    await user.save();
    return user._id;
  }

  async getUserByEmail(email: string) {
    return this.User.findOne({ email: email }).exec();
  }

  async getUserByEmailWithPassword(
    email: string
  ): Promise<CreateUserDto | null> {
    return this.User.findOne({ email: email })
      .select("_id email permissionFlags +password")
      .exec();
  }

  async removeUserById(userId: string) {
    return this.User.deleteOne({ _id: userId }).exec();
  }

  async getUserById(userId: string) {
    return this.User.findOne({ _id: userId }).populate("firstName").exec();
  }

  async getUsers(limit: number = 25, page: number = 0) {
    return this.User.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  async updateUserById(userId: string, userFields: PatchUserDto | PutUserDto) {
    const existingUser = await this.User.findOneAndUpdate(
      { _id: userId },
      { $set: userFields },
      { new: true }
    ).exec();

    return existingUser;
  }
}

export default new UsersDao();

// dependency injection
