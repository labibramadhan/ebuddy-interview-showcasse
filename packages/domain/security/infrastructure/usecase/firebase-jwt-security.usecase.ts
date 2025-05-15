import { JwtSecurityParamsDTO } from "../../dto/jwt-security-params.dto";
import { SecurityResultDTO } from "../../dto/security-result.dto";
import { IJwtSecurityUseCase } from "../../usecase/jwt-security-usecase.interface";
import { FirebaseServerService } from "@ebuddy/backend/core/service/firebase-server.service";
import { injectable } from "tsyringe";

@injectable()
export class FirebaseJwtSecurityUseCase implements IJwtSecurityUseCase {
  constructor(private firebaseServerService: FirebaseServerService) {}

  async extractAndValidate(
    params: JwtSecurityParamsDTO
  ): Promise<SecurityResultDTO> {
    const token = params.token;
    if (!token) {
      return Promise.reject({
        error: "Unauthorized: No token provided",
      });
    }

    const decodedToken =
      await this.firebaseServerService.auth.verifyIdToken(token);
    return {
      user: {
        userId: decodedToken.sub,
        email: decodedToken.email!,
        permissions: [],
      },
    };
  }
}
