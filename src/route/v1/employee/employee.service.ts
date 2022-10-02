import { Injectable } from '@nestjs/common';
import  CreateEmployeeDto  from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import EmployeeRepository from './employee.reponsitory';

@Injectable()
export class EmployeeService {
  constructor(private readonly employeeRepository:EmployeeRepository){}
  async create(createEmployeeDto: CreateEmployeeDto) {
    return await this.employeeRepository.createEmployee(createEmployeeDto);
  }

  async findAll(query: any) {
    return await this.employeeRepository.findAll(query);
  }

  async findAllDeleted(query: any) {
    return await this.employeeRepository.findAllDeleted(query);
  }

  async findOne(id: any) {
    return await this.employeeRepository.findOne(id);
  }

  async update(id: any, updateEmployeeDto: UpdateEmployeeDto) {
    return await this.employeeRepository.update(id, updateEmployeeDto);
  }

  async remove(id: any) {
    return await this.employeeRepository.remove(id);
  }

  async destroy(id: any) {
    return await this.employeeRepository.destroy(id);
  }

  async restore(id: any) {
    return await this.employeeRepository.restore(id);
  }
}
