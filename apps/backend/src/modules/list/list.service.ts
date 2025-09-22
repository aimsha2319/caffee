import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { AddListItemInput, CreateListInput } from './dto/create-list.input';

@Injectable()
export class ListService {
  constructor(private readonly prisma: PrismaService) {}

  async create(ownerId: string, input: CreateListInput) {
    return this.prisma.list.create({
      data: {
        ownerId,
        title: input.title,
        description: input.description,
        isCollaborative: input.isCollaborative
      },
      include: { items: { include: { place: true } } }
    });
  }

  async addItem(ownerId: string, input: AddListItemInput) {
    const list = await this.prisma.list.findUnique({ where: { id: input.listId } });
    if (!list || list.ownerId !== ownerId) {
      throw new Error('Not authorized to update this list');
    }
    await this.prisma.list.update({
      where: { id: input.listId },
      data: {
        items: {
          create: {
            placeId: input.placeId,
            note: input.note
          }
        }
      }
    });
    return this.findById(input.listId);
  }

  findById(id: string) {
    return this.prisma.list.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            place: true
          }
        }
      }
    });
  }

  listsForUser(userId: string) {
    return this.prisma.list.findMany({ where: { ownerId: userId }, include: { items: { include: { place: true } } } });
  }
}
