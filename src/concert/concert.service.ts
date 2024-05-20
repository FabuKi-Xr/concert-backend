import { Injectable } from '@nestjs/common';
import { Concert, ReserveTransaction } from './entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ConcertCreateRequest,
  ConcertData,
  ReserveTransactionData,
  ReserveTransactionDto,
} from './dto';

@Injectable()
export class ConcertService {
  constructor(
    @InjectRepository(Concert)
    private concertEntity: Repository<Concert>,
    @InjectRepository(ReserveTransaction)
    private transactionEntity: Repository<ReserveTransaction>,
  ) {}

  public async createConcert(concert: ConcertCreateRequest): Promise<boolean> {
    const conCertExist = await this.concertEntity.findOne({
      where: { name: concert.name },
    });

    if (conCertExist) {
      return false;
    }

    const newConcert = await this.concertEntity.save(concert);
    if (!newConcert) {
      return false;
    }

    return true;
  }

  public async getAllTransaction(): Promise<ReserveTransactionData[]> {
    const transaction = await this.transactionEntity.find({
      order: { datetime: 'DESC'},
    });
    return transaction;
  }

  public async getTransactionByUserId(userId: string): Promise<ReserveTransactionData[]> {
    const transaction = await this.transactionEntity.find({
      where: { userId },
      order: { datetime: 'DESC'},
    });

    return transaction;
  }

  public async createTransaction(transaction: ReserveTransactionDto): Promise<boolean> {
    console.log(transaction)
    try{
      const newTransaction = await this.transactionEntity.save(transaction);
      if (!newTransaction) {
        return false;
      }
  
      return true;
    }
    catch(e){
      return false;
    }
    
    
  }

  public async updateTransaction(transaction: ReserveTransactionData): Promise<boolean> {
    const transactionExist = await this.transactionEntity.findOne({
      where: { id: transaction.id },
    });

    if (!transactionExist) {
      return false;
    }

    const updateTransaction = await this.transactionEntity.update(transaction.id, transaction);
    if (!updateTransaction) {
      return false;
    }

    return true;
  }
  
  public async updateConcert(concert: ConcertData): Promise<boolean> {
    const conCertExist = await this.concertEntity.findOne({
      where: { id: concert.id },
    });

    if (!conCertExist) {
      return false;
    }

    const updateConcert = await this.concertEntity.update(concert.id, concert);
    if (!updateConcert) {
      return false;
    }

    return true;
  }

  public async getConcerts(): Promise<ConcertData[]> {
    const concerts = this.concertEntity.find();
    return concerts;
  }

  public async getConcertById(id: string): Promise<ConcertData> {
    const concert = await this.concertEntity.findOne({
      where: { id },
    });

    if (!concert) {
      return null;
    }

    return concert;
  }

  public async deleteConcert(id: string): Promise<boolean> {
    const conCertExist = await this.concertEntity.findOne({
      where: { id },
    });

    if (!conCertExist) {
      return false;
    }

    const deleteConcert = await this.concertEntity.delete(id);
    if (!deleteConcert) {
      return false;
    }

    return true;
  }
}
