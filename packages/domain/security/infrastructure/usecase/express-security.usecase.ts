import { IExpressSecurityUseCase } from "../../usecase/express-security-usecase.interface";
import { ExpressSecurityParams } from "../../dto/exoress-security-params.dto";
import { SecurityResultDTO } from "../../dto/security-result.dto";
import { ExpressJwtSecurityUseCaseToken, IExpressJwtSecurityUseCase } from "../../usecase/express-jwt-security-usecase.interface";
import { inject, injectable } from "tsyringe";
import { ExpressJwtSecurityParamsDTO } from "../..//dto/express-jwt-security-params.dto";

@injectable()
export class ExpressSecurityUseCase implements IExpressSecurityUseCase {
  constructor(
    @inject(ExpressJwtSecurityUseCaseToken)
    private expressJwtSecurityUseCase: IExpressJwtSecurityUseCase
  ) {}

  async validate(params: ExpressSecurityParams): Promise<SecurityResultDTO> {
    switch (params.securityName) {
      case "jwt":
        return this.expressJwtSecurityUseCase.extractAndValidate(
          new ExpressJwtSecurityParamsDTO(params.request)
        );
    }
    throw new Error(`Unsupported security name ${params.securityName}`);
  }
}
