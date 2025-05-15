import { container } from "tsyringe";
import { LoggerService } from "@ebuddy/backend/core/service/logger.service";
import { ConfigService } from "@ebuddy/backend/core/service/config.service";
import { UserUsecaseToken } from "@ebuddy/domain/user/usecase/user-usecase.interface";
import { UserUsecase } from "@ebuddy/domain/user/infrastructure/usecase/user.usecase";
import { UserRepositoryToken } from "@ebuddy/domain/user/repository/user-repository.interface";
import { FirebaseUserRepository } from "@ebuddy/domain/user/infrastructure/repository/firebase-user.repository";
import { FirebaseJwtSecurityUseCase } from "@ebuddy/domain/security/infrastructure/usecase/firebase-jwt-security.usecase";
import { JwtSecurityUseCaseToken } from "@ebuddy/domain/security/usecase/jwt-security-usecase.interface";
import { ExpressSecurityUseCase } from "@ebuddy/domain/security/infrastructure/usecase/express-security.usecase";
import { ExpressSecurityUseCaseToken } from "@ebuddy/domain/security/usecase/express-security-usecase.interface";
import { ExpressJwtSecurityUseCase } from "@ebuddy/domain/security/infrastructure/usecase/express-jwt-security.usecase";
import { ExpressJwtSecurityUseCaseToken } from "@ebuddy/domain/security/usecase/express-jwt-security-usecase.interface";

// CORE SERVICES
container.register(LoggerService, {
  useFactory: (dep) => {
    const configService = dep.resolve(ConfigService);
    return new LoggerService({
      serviceName: "Backend - Core",
      level: configService.config.logLevel,
    });
  },
});

// BUSINESS LOGIC SERVICES
container.register(UserRepositoryToken, FirebaseUserRepository);
container.register(UserUsecaseToken, UserUsecase);
container.register(JwtSecurityUseCaseToken, FirebaseJwtSecurityUseCase);
container.register(ExpressJwtSecurityUseCaseToken, ExpressJwtSecurityUseCase);
container.register(ExpressSecurityUseCaseToken, ExpressSecurityUseCase);

export { container };
