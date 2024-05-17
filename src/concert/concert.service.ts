import { Injectable } from '@nestjs/common';
import {
  Concert,
  ConcertCreateRequest,
  ConcertData,
} from './entity/concert.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ConcertService {
  constructor(
    @InjectRepository(Concert)
    private concertEntity: Repository<Concert>,
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
