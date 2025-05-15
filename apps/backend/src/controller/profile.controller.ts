import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Route,
  Security,
  Tags,
} from "tsoa";
import { inject, singleton } from "tsyringe";
import {
  IUserUsecase,
  UserUsecaseToken,
} from "@ebuddy/domain/user/usecase/user-usecase.interface";
import { User } from "@ebuddy/types/entities/user";
import { Request as ExpressRequest } from "express";

@singleton()
@Tags("Profile")
@Route("/profile")
@Security("jwt")
export class ProfileController extends Controller {
  constructor(
    @inject(UserUsecaseToken)
    private userUsecase: IUserUsecase,
  ) {
    super();
  }

  @Get("/")
  async get(@Request() request: ExpressRequest): Promise<User | null> {
    return this.userUsecase.getUserById(request.user.userId);
  }

  @Post()
  async update(
    @Request() request: ExpressRequest,
    @Body() requestBody: Partial<User>,
  ): Promise<User> {
    return this.userUsecase.updateUser(request.user.userId, requestBody);
  }
}
