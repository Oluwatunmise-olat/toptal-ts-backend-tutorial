export interface CreateUserDto {
  permissionFlags: number;
  _id: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}
