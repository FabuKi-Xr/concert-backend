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
import { ReserveTransactionDto } from './dto';

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

  @Get('/transaction/:userId')
  async getTransactionByUserId(@Param('userId') userId: string) {
    return await this.concertService.getTransactionByUserId(userId);
  }

  @Post('/transaction')
  async createTransaction(@Body() transaction: ReserveTransactionDto) {
    const isSuccess = await this.concertService.createTransaction(transaction)
    if (!isSuccess)
      throw new HttpException('', HttpStatus.BAD_REQUEST);
  }


  @Post()
  async createConcert(@Body() concert: ConcertCreateRequest) {
    const isSuccess = await this.concertService.createConcert(concert);
    if (!isSuccess)
      throw new HttpException("", HttpStatus.BAD_REQUEST);
  }

  @Delete(':id')
  async deleteConcert(@Param('id') id: string) {
    const isSuccess = await this.concertService.deleteConcert(id)
    if (!isSuccess)
      throw new HttpException("", HttpStatus.BAD_REQUEST);
  }

  @Put()
  async updateConcert(@Body() concert: ConcertData) {
    const isSuccess = await this.concertService.updateConcert(concert)
    if (!isSuccess)
      throw new HttpException('', HttpStatus.BAD_REQUEST);
  }
}
