import { User } from "@ebuddy/types/entities/user";

export const UserRepositoryToken = "UserRepository";

export interface IUserRepository {
  getUserById(userId: string): Promise<User | null>;
  updateUser(userId: string, userData: Partial<User>): Promise<User>;
}
