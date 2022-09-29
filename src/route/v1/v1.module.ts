import { Module } from "@nestjs/common";
import { RouterModule, Routes } from "nest-router";
import { PitchModule } from "./pitch/pitch.module";

const routesv1: Routes = [
    {
        path: 'v1',
        children: [{
            path: '/pitch',
            module: PitchModule,
        },
    ]
    },
]

@Module({
    imports: [
        RouterModule.forRoutes(routesv1),
        PitchModule
    ]
})
export class RouteV1Module { }