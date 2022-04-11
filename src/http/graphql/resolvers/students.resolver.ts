import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import { StudentsService } from '../../../services/students.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';

import { Student } from '../models/student';

@Resolver()
export class StudentsResolver {
  constructor(private readonly studentsService: StudentsService) {}

  @Query(() => [Student])
  @UseGuards(AuthorizationGuard)
  async students() {
    const students = await this.studentsService.listAll();

    return students;
  }
}