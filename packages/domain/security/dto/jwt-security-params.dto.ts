export class JwtSecurityParamsDTO {
  token: string;

  constructor(token: string) {
    this.token = token;
  }
}
