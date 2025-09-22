import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { ModerateReportInput } from './dto/update-report.input';

@Injectable()
export class ModerationService {
  constructor(private readonly prisma: PrismaService) {}

  getReports() {
    return this.prisma.report.findMany({ orderBy: { createdAt: 'asc' } });
  }

  async moderate(input: ModerateReportInput) {
    return this.prisma.report.update({
      where: { id: input.reportId },
      data: {
        status: input.status,
        resolutionNote: input.resolutionNote
      }
    });
  }
}
