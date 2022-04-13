import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  listAll() {
    return this.prisma.student.findMany();
  }

  findOne(id: string) {
    return this.prisma.student.findUnique({
      where: {
        id,
      },
    });
  }

  async findByUserId(userId: string) {
    const student = this.prisma.student.findUnique({
      where: {
        userId,
      },
    });

    if (!student) {
      throw new Error('Student not found!');
    }

    return student;
  }
}
