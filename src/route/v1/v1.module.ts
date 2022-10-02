import { Module } from "@nestjs/common";
import { RouterModule, Routes } from "nest-router";
import { EmployeeModule } from "./employee/employee.module";
import { PitchModule } from "./pitch/pitch.module";

const routesv1: Routes = [
    {
        path: 'v1',
        children: [{
            path: '/pitch',
            module: PitchModule,
        },
        {
            path: '/employee',
            module: EmployeeModule,
        }
    ]
    },
]

@Module({
    imports: [
        RouterModule.forRoutes(routesv1),
        PitchModule,
        EmployeeModule,
    ]
})
export class RouteV1Module { }