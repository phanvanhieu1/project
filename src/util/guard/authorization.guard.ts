import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { ErrorThrowEnum } from "../enum/error.enum";
@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(private allowedRoles: string[]) {

    }
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
  }
  isAllowed(userRoles: string[]){
    let allowed = false;
    userRoles.forEach((role) => {
        if(!allowed && this.allowedRoles.includes(userRoles)) {
            allowed = true;
        }
    });
  }
}