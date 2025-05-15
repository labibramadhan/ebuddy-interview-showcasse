import { Request } from "express";

export class ExpressJwtSecurityParamsDTO {
  request: Request;

  constructor(request: Request) {
    this.request = request;
  }
}
