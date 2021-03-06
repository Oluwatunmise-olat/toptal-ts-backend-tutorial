import { CRUD } from "../common/interfaces/crud.iterface";
import usersDao from "./daos/users.dao";
import { CreateUserDto, PatchUserDto, PutUserDto } from "./dto";

class UserService implements CRUD {
  async list(limit: number, page: number) {
    return usersDao.getUsers(limit, page);
  }
  async create(resource: CreateUserDto) {
    return usersDao.create(resource);
  }
  async deleteById(id: string) {
    return usersDao.removeUserById(id);
  }
  async patchById(id: string, resource: PatchUserDto) {
    return usersDao.updateUserById(id, resource);
  }
  async getById(id: string) {
    return usersDao.getUserById(id);
  }
  async putById(id: string, resource: PutUserDto) {
    return usersDao.updateUserById(id, resource);
  }
  async getUserByEmail(email: string) {
    return usersDao.getUserByEmail(email);
  }

  async getUserByEmailWithPassword(email: string) {
    return usersDao.getUserByEmailWithPassword(email);
  }
}

export default new UserService();
