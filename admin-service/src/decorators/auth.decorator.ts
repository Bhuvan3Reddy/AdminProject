import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { AuthenticatedUser } from "../endpoints/auth/auth.interface";

export function CurrentUser(field?: string) {
  return createParamDecorator(
    (data: unknown, ctx: ExecutionContext): AuthenticatedUser | any => {
      const request = ctx.switchToHttp().getRequest();
      const user = request.user;

      if (field && user && typeof user === "object") {
        return user[field];
      }

      return user;
    }
  )();
}
