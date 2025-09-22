import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  findByHandle(handle: string) {
    return this.prisma.user.findUnique({ where: { handle } });
  }

  listFollowers(userId: string) {
    return this.prisma.userFollow.findMany({ where: { targetId: userId }, include: { source: true } });
  }

  listFollowing(userId: string) {
    return this.prisma.userFollow.findMany({ where: { sourceId: userId }, include: { target: true } });
  }
}
