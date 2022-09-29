import { Module } from "@nestjs/common";
import { RouterModule, Routes } from "nest-router";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";

const routes: Routes = [
    {
        path: 'core',
        children: [{
            path: '/auth',
            module: AuthModule,
        }, {
            path: '/user',
            module: UserModule
        },
    ]
    },
]

@Module({
    imports: [
        RouterModule.forRoutes(routes),
        AuthModule,
        UserModule
    ]
})
export class RouteCoreModule { }