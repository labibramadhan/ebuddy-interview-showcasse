import { ExpressSecurityParams } from "../dto/exoress-security-params.dto";
import { SecurityResultDTO } from "../dto/security-result.dto";

export const ExpressSecurityUseCaseToken = "ExpressSecurityUseCase";
export interface IExpressSecurityUseCase {
  validate(params: ExpressSecurityParams): Promise<SecurityResultDTO>;
}
