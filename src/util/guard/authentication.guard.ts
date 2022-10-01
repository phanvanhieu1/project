import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { ErrorThrowEnum } from "../enum/error.enum";

@Injectable()
export class AuthenticationGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
      throw new Error(ErrorThrowEnum.UNAUTHORIZED_EXCEPTION);
    }
    return true;
  }
}