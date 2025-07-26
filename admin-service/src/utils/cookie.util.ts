import { Response } from 'express';

export interface CookieOptions {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: boolean | 'lax' | 'strict' | 'none';
  maxAge?: number;
  path?: string;
  [key: string]: any;
}

export function setCookie(
  response: Response,
  name: string,
  value: string,
  options: CookieOptions = {}
) {
  response.cookie(name, value, options);
}

export function clearCookie(response: Response, name: string, options: CookieOptions = {}) {
  response.clearCookie(name, options);
}
