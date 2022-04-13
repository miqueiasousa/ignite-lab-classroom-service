import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CoursesService } from '../../../services/courses.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';

import { CreateCourseInput } from '../inputs/createCourseInput';
import { Course } from '../models/course';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(private coursesService: CoursesService) {}

  @Query(() => [Course])
  @UseGuards(AuthorizationGuard)
  async courses() {
    const courses = await this.coursesService.listAll();

    return courses;
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
