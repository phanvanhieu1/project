import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Put } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import  CreateEmployeeDto  from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { AdminGuard } from 'src/util/guard/admin.guard';
import { AuthenticationGuard } from 'src/util/guard/authentication.guard';
import ResponseUtils from 'src/util/response/response.utils';
import { RequestExpress } from 'src/util/interface/exception-response.interface';

@Controller()
@UseGuards(AdminGuard)
  @UseGuards(AuthenticationGuard)
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    const data = await this.employeeService.create(createEmployeeDto);
    return ResponseUtils.success(data);
  }

  @Get()
  async findAll(@Req() req: RequestExpress) {
    const data = await this.employeeService.findAll(req.query);
    return ResponseUtils.success(data);
  }
  
  @Get('deleted')
  async findAllDeleted(@Req() req: RequestExpress) {
    const data = await this.employeeService.findAllDeleted(req.query);
    return ResponseUtils.success(data);
  }

  @Get(':id')
  async findOne(@Param('id') id: any) {
    const data= await this.employeeService.findOne(id);
    return ResponseUtils.success(data);
  }

  // update
  @Put(':id')
  async update(@Param('id') id: any, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    const data = await this.employeeService.update(id, updateEmployeeDto);
    return ResponseUtils.success(data);
  }

  // khoi phuc
  @Put(':id')
  async restore(@Param('id') id: any) {
    const data =await this.employeeService.restore(id);
    return ResponseUtils.success(data);
  }

// xoa tam thoi
  @Patch(':id')
  async remove(@Param('id') id: any) {
    const data =await this.employeeService.remove(id);
    return ResponseUtils.success(data);
  }
// xoa vinh vien
  @Delete(':id')
  async destroy(@Param('id') id: any) {
    const data =await this.employeeService.destroy(id);
    return ResponseUtils.success(data);
  }
}
