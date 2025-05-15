import { ExpressSecurityUseCase } from "@ebuddy/domain/security/infrastructure/usecase/express-security.usecase";
import { ExpressSecurityUseCaseToken } from "@ebuddy/domain/security/usecase/express-security-usecase.interface";
import express from "express";
import { container } from "tsyringe";

export async function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[],
): Promise<any> {
  const expressSecurityUseCase = container.resolve<ExpressSecurityUseCase>(
    ExpressSecurityUseCaseToken,
  );

  const result = await expressSecurityUseCase.validate({
    request,
    securityName,
    scopes,
  });
  return result.user;
}
