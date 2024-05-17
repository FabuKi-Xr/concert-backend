import { Test, TestingModule } from '@nestjs/testing';
import { ConcertController } from './concert.controller';
import { ConcertService } from './concert.service';
import { Concert, mockConcertEntity } from './entity/concert.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ConcertController', () => {
  let controller: ConcertController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConcertController],
      providers: [
        ConcertService,
        {
          provide: getRepositoryToken(Concert),
          useValue: mockConcertEntity,
        },
      ],
    }).compile();

    controller = module.get<ConcertController>(ConcertController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
