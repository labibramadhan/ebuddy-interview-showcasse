export class SecurityResultDTO {
  user: {
    userId: string;
    email: string;
    permissions: string[];
  };

  constructor(user: {
    userId: string;
    email: string;
    permissions: string[];
  }) {
    this.user = {
      userId: user.userId,
      email: user.email,
      permissions: user.permissions
    };
  }
}
