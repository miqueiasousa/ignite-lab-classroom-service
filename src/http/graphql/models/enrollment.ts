import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Course } from './course';
import { Student } from './student';

@ObjectType()
export class Enrollment {
  @Field(() => ID)
  id: string;

  studentId: string;

  courseId: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Date, { nullable: true })
  canceledAt?: Date;

  @Field(() => Student)
  student: Student;

  @Field(() => Course)
  course: Course;
}
