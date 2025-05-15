import { Request } from "express";

export class ExpressSecurityParams {
  request: Request;
  securityName: string;
  scopes?: string[];

  constructor(request: Request, securityName: string, scopes?: string[]) {
    this.request = request;
    this.securityName = securityName;
    this.scopes = scopes;
  }
}
