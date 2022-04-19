import { CreateUserDto, PatchUserDto, PutUserDto } from "../dto/index";

class UsersDao {
  users: Array<CreateUserDto> = [];

  constructor() {}

  async create(user: CreateUserDto) {
    user.id = Date.now().toString();
    this.users.push(user);
    return user.id;
  }

  async getUsers(): Promise<Array<CreateUserDto>> {
    return new Promise((resolve, reject) => {
      return resolve(this.users);
    });
  }

  async getUserById(userId: string): Promise<CreateUserDto | undefined> {
    return this.users.find(({ id }) => id == userId);
  }

  async putUserById(userId: string, user: PutUserDto) {
    const objIndex = this.users.findIndex((obj) => obj.id === userId);
    this.users.splice(objIndex, 1, user);
    return `${user.id} updated via put`;
  }

  async patchUserById(userId: string, user: PatchUserDto) {
    const objIndex = this.users.findIndex((obj) => obj.id === userId);
    let currentUser = this.users[objIndex];
    const allowedPatchFields = [
      "password",
      "firstName",
      "lastName",
      "permissionLevel"
    ];
    for (let field of allowedPatchFields) {
      if (field in user) {
        // @ts-ignore
        currentUser[field] = user[field];
      }
    }
    this.users.splice(objIndex, 1, currentUser);
    return `${user.id} patched`;
  }

  async removeUserById(userId: string): Promise<string> {
    const objIndex = this.users.findIndex(({ id }) => id == userId);
    this.users.splice(objIndex, 1);
    return `user with id ${userId} removed`;
  }

  async getUserByEmail(email: string) {
    const objIndex = this.users.findIndex((obj) => {
      return obj.email === email;
    });
    let currentUser = this.users[objIndex];
    if (currentUser) {
      return currentUser;
    } else {
      return null;
    }
  }
}

export default new UsersDao();


// singleton pattern
// dependency injection
