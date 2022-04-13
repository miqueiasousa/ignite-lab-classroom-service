import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CoursesService } from '../../../services/courses.service';
import { StudentsService } from '../../../services/students.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { AuthUser, CurrentUser } from '../../auth/currentUser';

import { CreateCourseInput } from '../inputs/createCourseInput';
import { Course } from '../models/course';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(
    private coursesService: CoursesService,
    private studentsService: StudentsService,
  ) {}

  @Query(() => [Course])
  @UseGuards(AuthorizationGuard)
  async courses() {
    const courses = await this.coursesService.listAll();

    return courses;
  }

  @Query(() => Course)
  @UseGuards(AuthorizationGuard)
  async course(
    @Args('id')
    id: string,
    @CurrentUser()
    user: AuthUser,
  ) {
    const student = await this.studentsService.findByUserId(user.sub);

    if (!student) {
      throw new Error('Student not found!');
    }

    const course = await this.coursesService.findByStudentId(id, student.id);

    if (!course) {
      throw new UnauthorizedException();
    }

    return course;
  }

  @Mutation(() => Course)
  @UseGuards(AuthorizationGuard)
  async createCourse(
    @Args('data')
    data: CreateCourseInput,
  ) {
    const course = await this.coursesService.create(data);

    return course;
  }
}
