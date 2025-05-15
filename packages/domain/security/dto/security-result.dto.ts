export class SecurityResultDTO {
  user: {
    userId: string;
    email: string;
    permissions: string[];
  };

  constructor(user: {
    uid: string;
    email: string;
    permissions: string[];
  }) {
    this.user = user;
  }
}
