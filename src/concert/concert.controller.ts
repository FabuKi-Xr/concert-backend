import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ConcertService } from './concert.service';
import { ConcertCreateRequest, ConcertData } from './dto/concert.dto';

@Controller('concert')
export class ConcertController {
  constructor(private concertService: ConcertService) {}

  @Get()
  async getConcerts(@Query('id') id: string) {
    if (!id) return this.concertService.getConcerts();

    const concert = await this.concertService.getConcertById(id);

    if (!concert) throw new HttpException(null, HttpStatus.BAD_REQUEST);
    return concert;
  }

  @Get('/transaction')
  async getAllTransaction() {
    return await this.concertService.getAllTransaction();
  }

  @Post()
  async createConcert(@Body() concert: ConcertCreateRequest) {
    if (!this.concertService.createConcert(concert))
      throw new HttpException('', HttpStatus.BAD_REQUEST);
  }

  @Delete(':id')
  async deleteConcert(@Param('id') id: string) {
    if (!this.concertService.deleteConcert(id))
      throw new HttpException('', HttpStatus.BAD_REQUEST);
  }

  @Put()
  async updateConcert(@Body() concert: ConcertData) {
    if (!this.concertService.updateConcert(concert))
      throw new HttpException('', HttpStatus.BAD_REQUEST);
  }
}
