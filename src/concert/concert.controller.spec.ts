import { Test, TestingModule } from '@nestjs/testing';
import { ConcertController } from './concert.controller';
import { ConcertService } from './concert.service';
import { Concert } from './entity/concert.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { concertMock, mockConcertEntity } from './mock/concert.mock';
import { ReserveTransaction } from './entity';
import { mockTransactionEntity, transactionMock } from './mock';
import { mock } from 'node:test';
import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';

describe('ConcertController', () => {
  let controller: ConcertController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ ],
      controllers: [ConcertController],
      providers: [
        ConcertService,
        {
          provide: getRepositoryToken(Concert),
          useValue: mockConcertEntity,
        },
        {
          provide: getRepositoryToken(ReserveTransaction),
          useValue: mockTransactionEntity,
        }
      ],
    }).compile();

    controller = module.get<ConcertController>(ConcertController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getConcerts', () => {
    it('should return an array of mocking concerts', async () => {
      mockConcertEntity.find.mockResolvedValue(concertMock.data);
      const actualResult = await controller.getConcerts(null) as Concert[];
      
      expect(actualResult).toEqual(concertMock.data);
      expect(mockConcertEntity.find).toHaveBeenCalledTimes(1);
    });

    it('should return a mocking concert', async () => {
      mockConcertEntity.findOne.mockResolvedValue(concertMock.data[0]);

      const actualResult = await controller.getConcerts('1');

      expect(actualResult).toEqual(concertMock.data[0]);
      expect(mockConcertEntity.findOne).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if concert does not exist', async () => {
      mockConcertEntity.findOne.mockResolvedValue(null);

      const actualResult = controller.getConcerts('1');
      await expect(actualResult).rejects.toThrow();
      await expect(actualResult).rejects.toBeInstanceOf(HttpException)
      expect(mockConcertEntity.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('getAllTransaction', () => {
    it('should return an array of mocking transactions', async () => {
      mockTransactionEntity.find.mockResolvedValue(transactionMock);
      const actualResult = await controller.getAllTransaction();

      expect(actualResult).toEqual(transactionMock);
      expect(mockTransactionEntity.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('getTransactionByUserId', () => {
    it('should return an array of mocking transactions', async () => {
      mockTransactionEntity.find.mockResolvedValue(transactionMock);
      const actualResult = await controller.getTransactionByUserId('1');

      expect(actualResult).toEqual(transactionMock);
      expect(mockTransactionEntity.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('createTransaction', () => {
    it('should create a transaction', async () => {
      mockTransactionEntity.save.mockResolvedValue(transactionMock[0]);

      const actualResult = await controller.createTransaction(transactionMock[0]);

      expect(actualResult).toBeUndefined();
      expect(mockTransactionEntity.save).toBeTruthy();
      expect(mockTransactionEntity.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('createConcert', () => {
    it('should create a concert', async () => {
      mockConcertEntity.findOne.mockResolvedValue(null);
      mockConcertEntity.save.mockResolvedValue(concertMock.data[0]);

      const actualResult = await controller.createConcert(concertMock.data[0]);

      expect(actualResult).toBeUndefined();
      expect(mockConcertEntity.findOne).toHaveBeenCalledTimes(1);
      expect(mockConcertEntity.save).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if concert already exists', async () => {
      mockConcertEntity.findOne.mockResolvedValue(concertMock.data[0]);
      const {name,description,seats} = {...concertMock.data[0]}
      const actualResult = controller.createConcert({name,description,seats});

      await expect(actualResult).rejects.toThrow("");
      await expect(actualResult).rejects.toBeInstanceOf(HttpException);
      expect(mockConcertEntity.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteConcert', () => {
    it('should delete a concert', async () => {
      mockConcertEntity.delete.mockResolvedValue({ affected: 1 });

      const actualResult = await controller.deleteConcert('1');

      expect(actualResult).toBeUndefined();
      expect(mockConcertEntity.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if concert does not exist', async () => {
      mockConcertEntity.findOne.mockResolvedValue(null);
      mockConcertEntity.delete.mockResolvedValue({ affected: 1 });

      const actualResult = controller.deleteConcert('1');

      await expect(actualResult).rejects.toThrow("");
      await expect(actualResult).rejects.toBeInstanceOf(HttpException);
      expect(mockConcertEntity.findOne).toHaveBeenCalledTimes(1);
      expect(mockConcertEntity.delete).toHaveBeenCalledTimes(0);
    });
  });

  describe('updateConcert', () => {
    it('should update a concert', async () => {
      mockConcertEntity.findOne.mockResolvedValue(concertMock.data[0]);
      mockConcertEntity.update.mockResolvedValue(concertMock.data[0]);

      const actualResult = await controller.updateConcert(concertMock.data[0]);

      expect(actualResult).toBeUndefined();
      expect(mockConcertEntity.findOne).toHaveBeenCalledTimes(1);
      expect(mockConcertEntity.update).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if concert does not exist', async () => {
      mockConcertEntity.findOne.mockResolvedValue(null);

      const actualResult = controller.updateConcert(concertMock.data[0]);

      await expect(actualResult).rejects.toThrow("");
      await expect(actualResult).rejects.toBeInstanceOf(HttpException);
      expect(mockConcertEntity.findOne).toHaveBeenCalledTimes(1);
      expect(mockConcertEntity.update).toHaveBeenCalledTimes(0);
    });
    
  });

});
