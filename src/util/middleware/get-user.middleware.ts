import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request } from "express";
import * as jwt from "jsonwebtoken";
import { ErrorThrowEnum } from "../enum/error.enum";

@Injectable()
export class getUserMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const authJwt = req.headers.authorization;
        if (!authJwt) {
            next();
            return;
        }
        try {
            const datatoken:any = jwt.verify(authJwt, process.env.JWT_SECRET);
            const user = datatoken;
            if(user) {
                 req.user = user;
            }else{
                throw new Error(ErrorThrowEnum.INVALID_TOKEN);
            }
        } catch (error) {
            throw new Error(ErrorThrowEnum.INVALID_TOKEN);
        }
        next();
      }
}