import { IUserUsecase } from "../../usecase/user-usecase.interface";
import { IUserRepository } from "../../repository/user-repository.interface";
import { User } from "@ebuddy/types/entities/user";
import { inject, injectable } from "tsyringe";
import { UserRepositoryToken } from "../../repository/user-repository.interface";

@injectable()
export class UserUsecase implements IUserUsecase {
  constructor(
    @inject(UserRepositoryToken)
    private userRepository: IUserRepository
  ) {}

  async getUserById(userId: string): Promise<User | null> {
    return this.userRepository.getUserById(userId);
  }

  async updateUser(userId: string, userData: Partial<User>): Promise<User> {
    return this.userRepository.updateUser(userId, userData);
  }
}
