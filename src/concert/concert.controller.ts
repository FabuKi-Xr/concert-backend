import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ConcertService } from './concert.service';
import { ConcertCreateRequest, ConcertData } from './dto/concert.dto';

@Controller('concert')
export class ConcertController {
  constructor(private concertService: ConcertService) {}

  @Get()
  async getConcerts() {
    return this.concertService.getConcerts();
  }

  @Post()
  async createConcert(concert: ConcertCreateRequest) {
    if (!this.concertService.createConcert(concert)) return BadRequestException;
  }

  @Delete(':id')
  async deleteConcert(@Param('id') id: string) {
    if (!this.concertService.deleteConcert(id)) return BadRequestException;
  }

  @Put()
  async updateConcert(concert: ConcertData) {
    if (!this.concertService.updateConcert(concert)) return BadRequestException;
  }
}
