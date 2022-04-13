import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

import { PrismaService } from '../database/prisma/prisma.service';

interface CreateCourseParams {
  title: string;
}

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async create({ title }: CreateCourseParams) {
    const slug = slugify(title, { lower: true });

    const courseWithSameSlug = await this.prisma.course.findUnique({
      where: { slug },
    });

    if (courseWithSameSlug) {
      throw new Error(`Course with slug ${slug} already exists`);
    }

    return this.prisma.course.create({
      data: {
        title,
        slug,
      },
    });
  }

  listAll() {
    return this.prisma.course.findMany();
  }

  findOne(id: string) {
    return this.prisma.course.findUnique({
      where: {
        id,
      },
    });
  }

  findByStudentId(courseId: string, studentId: string) {
    return this.prisma.course.findFirst({
      where: {
        id: courseId,
        Enrollments: {
          some: {
            studentId: studentId,
          },
        },
      },
    });
  }
}
