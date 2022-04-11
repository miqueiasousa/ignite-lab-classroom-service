import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { EnrollmentsService } from '../../../services/enrollments.service';
import { StudentsService } from '../../../services/students.service';
import { CoursesService } from '../../../services/courses.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';

import { Enrollment } from '../models/enrollment';
import { Student } from '../models/student';
import { Course } from '../models/course';

@Resolver(() => Enrollment)
export class EnrollmentsResolver {
  constructor(
    private enrollmentsService: EnrollmentsService,
    private studentsService: StudentsService,
    private coursesService: CoursesService,
  ) {}

  @Query(() => [Enrollment])
  @UseGuards(AuthorizationGuard)
  async enrollments() {
    const enrollments = await this.enrollmentsService.listAll();

    return enrollments;
  }

  @ResolveField(() => Student)
  async student(
    @Parent()
    enrollment: Enrollment,
  ) {
    const student = await this.studentsService.findOne(enrollment.studentId);

    return student;
  }

  @ResolveField(() => Course)
  async course(
    @Parent()
    enrollment: Enrollment,
  ) {
    const course = await this.coursesService.findOne(enrollment.courseId);

    return course;
  }
}
