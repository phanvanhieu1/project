import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ErrorThrowEnum } from 'src/util/enum/error.enum';
import { pageNum } from 'src/util/enum/varialGlobal';
import { Employee } from './entities/employee.entity';
import { EmployeeDocument } from './schemas/employee.schema';

@Injectable()
export default class EmployeeRepository {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
  ) {}

  async createEmployee(employee: any): Promise<any> {
    const createdEmployee = await this.employeeModel.create(employee);
    return createdEmployee;
  }

  async findAll(query: any): Promise<any> {
    return await this.employeeModel
      .find({ isDeleted: false })
      .skip(query.page * pageNum)
      .limit(pageNum);
  }

    async findAllDeleted(query: any): Promise<any> {
    return await this.employeeModel
      .find({ isDeleted: true })
      .skip(query.page * pageNum)
      .limit(pageNum);
    }

    async findOne(id: any): Promise<any> {
    return await this.employeeModel.findById(id);
    }

    async update(id: any, employee: any): Promise<any> {
    const check = await this.employeeModel.findById(id);
    if (!check) {
      throw new Error(ErrorThrowEnum.EMPLOYEE_ALREADY_EXISTS);
    }
    if(check.isDeleted===true){
      throw new Error(ErrorThrowEnum.EMPLOYEE_ALREADY_DELETED);
    }
    return await this.employeeModel.findByIdAndUpdate(id, employee);
    }

    async remove(id: any): Promise<any> {
    const check = await this.employeeModel.findById(id);
    if (!check) {
      throw new Error(ErrorThrowEnum.EMPLOYEE_ALREADY_EXISTS);
    }
    return await this.employeeModel.findByIdAndUpdate(id, { isDeleted: true });
    }

    async destroy(id: any): Promise<any> {
      return await this.employeeModel.findByIdAndDelete(id);
    }

    async restore(id: any): Promise<any> {
      return await this.employeeModel.findByIdAndUpdate(id, { isDeleted: false });
    }
}
