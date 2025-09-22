import { Module } from '@nestjs/common';
import { PlaceResolver } from './place.resolver';
import { PlaceService } from './place.service';

@Module({
  providers: [PlaceResolver, PlaceService],
  exports: [PlaceService]
})
export class PlaceModule {}
