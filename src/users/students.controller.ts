import { Controller, Get, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Student } from './models/student';
import { StudentsService } from './students.service';

@Controller()
export class StudentsController {

  private logger = new Logger('StudentController');

  constructor(private studentService: StudentsService) { }


  @MessagePattern('getAllStudents')
  async getStudents(data: any): Promise<Student[]> {
    this.logger.log('params: ' + data)
    return this.studentService.getStudents()
  }

  @MessagePattern('updateStudent')
  async updateStudent(data: any): Promise<Student> {
    this.logger.log('params: ' + data)
    return this.studentService.updateStudent(data)
  }

  @MessagePattern('removeStudent')
  async removeStudent(data: any): Promise<Student> {
    this.logger.log('params: ' + data)
    return this.studentService.deleteStudent(data)
  }






}