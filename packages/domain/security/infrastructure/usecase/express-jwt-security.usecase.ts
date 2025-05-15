import {
  IJwtSecurityUseCase,
  JwtSecurityUseCaseToken,
} from "../../usecase/jwt-security-usecase.interface";
import { ExpressJwtSecurityParamsDTO } from "../../dto/express-jwt-security-params.dto";
import { IExpressJwtSecurityUseCase } from "../../usecase/express-jwt-security-usecase.interface";
import { JwtSecurityParamsDTO } from "../../dto/jwt-security-params.dto";
import { SecurityResultDTO } from "../../dto/security-result.dto";
import { inject, injectable } from "tsyringe";

@injectable()
export class ExpressJwtSecurityUseCase implements IExpressJwtSecurityUseCase {
  constructor(
    @inject(JwtSecurityUseCaseToken)
    private jwtSecurityUseCase: IJwtSecurityUseCase
  ) {}

  async extractAndValidate(
    params: ExpressJwtSecurityParamsDTO
  ): Promise<SecurityResultDTO> {
    const token = params.request.headers.authorization;
    if (!token || !token.startsWith("Bearer ")) {
      return Promise.reject({
        error: "Unauthorized: Missing or invalid token format",
      });
    }

    const tokenValue = token.split("Bearer ")[1];
    if (!tokenValue) {
      return Promise.reject({
        error: "Unauthorized: No token provided",
      });
    }

    return this.jwtSecurityUseCase.extractAndValidate(
      new JwtSecurityParamsDTO(tokenValue)
    );
  }
}
