import { Module } from '@nestjs/common';
import { ConcertController } from './concert.controller';
import { ConcertService } from './concert.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Concert, ReserveTransaction } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([Concert, ReserveTransaction])],
  controllers: [ConcertController],
  providers: [ConcertService],
})
export class ConcertModule {}
