import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";

import { StudentEntity } from "./models/student.entity";
import { StudentsController } from "./students.controller";
import { StudentsService } from "./students.service";


@Module({
    
    controllers:[StudentsController],
    imports: [TypeOrmModule.forFeature([StudentEntity])],
    providers: [StudentsService]
})
export class StudentsModule {}