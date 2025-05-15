import { SecurityResultDTO } from "../dto/security-result.dto";
import { ExpressJwtSecurityParamsDTO } from "../dto/express-jwt-security-params.dto";

export const ExpressJwtSecurityUseCaseToken = "ExpressJwtSecurityUseCase";
export interface IExpressJwtSecurityUseCase {
  extractAndValidate(
    params: ExpressJwtSecurityParamsDTO
  ): Promise<SecurityResultDTO>;
}
