import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { GetUserArgs } from "./dto/args/get-user.args";
import { GetUsersArgs } from "./dto/args/get-users.args";
import { CreateUserInput } from "./dto/input/create-user.input";
import { DeleteStudentInput } from "./dto/input/delete-user.input";
import { UpdateStudentInput } from "./dto/input/update-user.input";
import { Student } from "./models/student";
import { StudentEntity } from "./models/student.entity";

@Injectable()
export class StudentsService {

    private logger = new Logger('StudentsService')


    constructor(
        @InjectRepository(StudentEntity)
        private studentRepository: Repository<StudentEntity>,
    ) { }

    async getStudents(): Promise<Student[]> {
        const students : Student[] =  await this.studentRepository.find();
        this.logger.log("fetching students")
        return students;  
    }


    async updateStudent(updateUserData: UpdateStudentInput): Promise<Student> {
        this.logger.log("updating student")
        const student = { ...updateUserData };
        const updatedStudent: Student = await this.studentRepository.save(student);
        const studentById: Student = await this.studentRepository.findOne(updatedStudent.id);
        console.log("student by id:::::: " + JSON.stringify(studentById)) 
        return studentById;
    }

    async deleteStudent(deleteStudentInput: DeleteStudentInput): Promise<Student> { 
        const studentToDelete =  await this.studentRepository.findOne(deleteStudentInput.id)
        const deletedStudent =   await this.studentRepository.remove(studentToDelete);
        const returnStudent = {...deletedStudent,id:deleteStudentInput.id}
        console.log("deleted student:::::: " + JSON.stringify(returnStudent)) 
        return returnStudent;
    }







}