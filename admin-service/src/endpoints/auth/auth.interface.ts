export interface JwtPayload {
  sub: string; // user ID
  email: string;
  role: string;
  username: string;
  iat?: number;
  exp?: number;
}

export interface AuthenticatedUser {
  userId: string;
  email: string;
  role: string;
  username: string;
}

export interface LoginResult {
  user: AuthenticatedUser;
  token?: string;
  expiresAt: string;
}
