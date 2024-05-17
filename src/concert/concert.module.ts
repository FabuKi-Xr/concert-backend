import { Module } from '@nestjs/common';
import { ConcertController } from './concert.controller';
import { ConcertService } from './concert.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Concert } from './entity/concert.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Concert])],
  controllers: [ConcertController],
  providers: [ConcertService],
})
export class ConcertModule {}
