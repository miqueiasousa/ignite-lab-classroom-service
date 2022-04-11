import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class CoursesService {
  constructor(private prismaService: PrismaService) {}

  listAll() {
    return this.prismaService.course.findMany();
  }

  findOne(id: string) {
    return this.prismaService.course.findUnique({
      where: {
        id,
      },
    });
  }
}
