import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { StudentsService } from '../../../services/students.service';
import { EnrollmentsService } from '../../../services/enrollments.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';

import { Student } from '../models/student';
import { Enrollment } from '../models/enrollment';

@Resolver(() => Student)
export class StudentsResolver {
  constructor(
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService,
  ) {}

  @Query(() => [Student])
  @UseGuards(AuthorizationGuard)
  async students() {
    const students = await this.studentsService.listAll();

    return students;
  }

  @ResolveField(() => [Enrollment])
  async enrollments(
    @Parent()
    student: Student,
  ) {
    const enrollments = await this.enrollmentsService.findByStudentId(
      student.id,
    );

    return enrollments;
  }
}
