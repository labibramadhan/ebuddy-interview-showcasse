import { JwtSecurityParamsDTO } from "../dto/jwt-security-params.dto";
import { SecurityResultDTO } from "../dto/security-result.dto";

export const JwtSecurityUseCaseToken = "JwtSecurityUseCase";
export interface IJwtSecurityUseCase {
  extractAndValidate(params: JwtSecurityParamsDTO): Promise<SecurityResultDTO>;
}
