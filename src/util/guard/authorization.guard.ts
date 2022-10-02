import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { UserDocument } from "src/route/core/user/schemas/user.schemas";
import UserRespository from "src/route/core/user/user.repository";
import { UserService } from "src/route/core/user/user.service";
import { ErrorThrowEnum } from "../enum/error.enum";
@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(private allowedRoles: string[]) {

    }
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const userRole = request.user.role;
    const allowed = this.isAllowed(userRole);
    if(!allowed) {
        throw new Error(ErrorThrowEnum.UNAUTHORIZED);
    }

    return true;
  }
  isAllowed(userRoles: string[]){
    return this.allowedRoles.some(role => userRoles.includes(role));
  }
}