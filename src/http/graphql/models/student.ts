import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Enrollment } from './enrollment';

@ObjectType()
export class Student {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [Enrollment])
  enrollments: Enrollment[];
}
