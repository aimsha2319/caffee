import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { RankingService } from './ranking.service';

@Global()
@Module({
  providers: [PrismaService, RankingService],
  exports: [PrismaService, RankingService]
})
export class CommonModule {}
