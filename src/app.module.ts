import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConcertModule } from './concert/concert.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({}),
    ConcertModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
