import { Module } from "@nestjs/common";
import { RouterModule, Routes } from "nest-router";
import { EmployeeModule } from "./employee/employee.module";
import { PitchModule } from "./pitch/pitch.module";
import { ServiceModule } from './service/service.module';
import { OrderModule } from './order/order.module';
import { Statistic } from "./statistic/entities/statistic.entity";
import { StatisticModule } from "./statistic/statistic.module";


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
        },
        {
            path: '/service',
            module: ServiceModule,
        },
        {
            path: '/order',
            module: OrderModule,
        },
        {
            path: '/statistic',
            module: StatisticModule,
        }
    ]
    },
]

@Module({
    imports: [
        RouterModule.forRoutes(routesv1),
        PitchModule,
        EmployeeModule,
        ServiceModule,
        OrderModule,
    ]
})
export class RouteV1Module { }