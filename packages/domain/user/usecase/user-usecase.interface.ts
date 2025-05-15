import { User } from "@ebuddy/types/entities/user";

export const UserUsecaseToken = "UserUsecase";

export interface IUserUsecase {
  getUserById(userId: string): Promise<User | null>;
  updateUser(userId: string, userData: Partial<User>): Promise<User>;
}
