import { Test, TestingModule } from '@nestjs/testing';
import { ConcertService } from './concert.service';
import { Concert } from './entity/concert.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { concertMock, mockConcertEntity,mockTransactionEntity, transactionMock } from './mock';
import { ReserveTransaction } from './entity';

describe('ConcertService', () => {
  let concertService: ConcertService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    concertService = module.get<ConcertService>(ConcertService);
  });

  it('should be defined', () => {
    expect(concertService).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getConcerts', () => {
    it('should return an array of mocking concerts', async () => {
      mockConcertEntity.find.mockResolvedValue(concertMock.data);

      const actualResult = await concertService.getConcerts();

      expect(actualResult).toEqual(concertMock.data);
      expect(mockConcertEntity.find).toHaveBeenCalledTimes(1);
    });

    describe('getConcerts', () => {
      it('should return an empty array if there is no concert', async () => {
        mockConcertEntity.find.mockResolvedValue([]);

        const actualResult = await concertService.getConcerts();

        expect(actualResult).toEqual([]);
        expect(mockConcertEntity.find).toHaveBeenCalledTimes(1);
      });
    });
  });
  describe('getConcertById', () => {
    it('should return a mocking concert', async () => {
      mockConcertEntity.findOne.mockResolvedValue(concertMock.data[0]);

      const actualResult = await concertService.getConcertById('1');

      expect(actualResult).toEqual(concertMock.data[0]);
      expect(mockConcertEntity.findOne).toHaveBeenCalledTimes(1);
    });

    it('should return null if there is no concert', async () => {
      mockConcertEntity.findOne.mockResolvedValue(null);

      const actualResult = await concertService.getConcertById('1');

      expect(actualResult).toBeNull();
      expect(mockConcertEntity.findOne).toHaveBeenCalledTimes(1);
    });
  });
  describe('deleteConcert', () => {
    it('should return true if the concert is deleted', async () => {
      mockConcertEntity.findOne.mockResolvedValue(concertMock.data[0]);
      mockConcertEntity.delete.mockResolvedValue({ affected: 1 });

      const actualResult = await concertService.deleteConcert('1');


      expect(actualResult).toBeTruthy();
      expect(mockConcertEntity.findOne).toHaveBeenCalledTimes(1);
      expect(mockConcertEntity.delete).toHaveBeenCalledTimes(1);
    });

    it('should return false if the concert is not deleted', async () => {
      mockConcertEntity.findOne.mockResolvedValue(null);

      const actualResult = await concertService.deleteConcert('1');

      expect(actualResult).toBeFalsy();
      expect(mockConcertEntity.findOne).toHaveBeenCalledTimes(1);
      expect(mockConcertEntity.delete).toHaveBeenCalledTimes(0);
    });
  });
  describe('createConcert', () => {
    it('should return true if the concert is created', async () => {
      mockConcertEntity.save.mockResolvedValue(concertMock.data[0]);

      const actualResult = await concertService.createConcert(concertMock.data[0]);

      expect(actualResult).toBeTruthy();
      expect(mockConcertEntity.save).toHaveBeenCalledTimes(1);
    });

    it('should return false if the concert is not created', async () => {
      mockConcertEntity.save.mockResolvedValue(null);

      const actualResult = await concertService.createConcert(concertMock.data[0]);

      expect(actualResult).toBeFalsy();
      expect(mockConcertEntity.save).toHaveBeenCalledTimes(1);
    });
  });
  describe('updateConcert', () => {
    it('should return true if the concert is updated', async () => {
      mockConcertEntity.findOne.mockResolvedValue(concertMock.data[0]);
      mockConcertEntity.update.mockResolvedValue(concertMock.data[0]);

      const actualResult = await concertService.updateConcert(concertMock.data[0]);

      expect(actualResult).toBeTruthy();
      expect(mockConcertEntity.findOne).toHaveBeenCalledTimes(1);
      expect(mockConcertEntity.update).toHaveBeenCalledTimes(1);
    });

    it('should return false if the concert is not updated', async () => {
      mockConcertEntity.findOne.mockResolvedValue(null);

      const actualResult = await concertService.updateConcert(concertMock.data[0]);

      expect(actualResult).toBeFalsy();
      expect(mockConcertEntity.findOne).toHaveBeenCalledTimes(1);
      expect(mockConcertEntity.update).toHaveBeenCalledTimes(0);
    });
  });
  describe('getAllTransaction', () => {
    it('should return an array of mocking transactions', async () => {
      mockTransactionEntity.find.mockResolvedValue(concertMock.data);

      const actualResult = await concertService.getAllTransaction();

      expect(actualResult).toEqual(concertMock.data);
      expect(mockTransactionEntity.find).toHaveBeenCalledTimes(1);
    });

  describe('getAllTransaction', () => {
      it('should return an empty array if there is no transaction', async () => {
        mockTransactionEntity.find.mockResolvedValue([]);

        const actualResult = await concertService.getAllTransaction();

        expect(actualResult).toEqual([]);
        expect(mockTransactionEntity.find).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('getTransactionByUserId', () => {
    it('should return a mocking transaction', async () => {
      const targetUserId = transactionMock[0].userId;
      mockTransactionEntity.find.mockResolvedValue(transactionMock[0]);

      const actualResult = await concertService.getTransactionByUserId(targetUserId);

      expect(actualResult).toEqual(transactionMock[0]);
      expect(mockTransactionEntity.find).toHaveBeenCalledTimes(1);
    });

    it('should return null if there is no transaction', async () => {
      mockTransactionEntity.find.mockResolvedValue(null);

      const actualResult = await concertService.getTransactionByUserId('1');

      expect(actualResult).toBeNull();
      expect(mockTransactionEntity.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('createTransaction', () => {
    it('should return true if the transaction is created', async () => {
      mockTransactionEntity.save.mockResolvedValue(transactionMock[0]);

      const actualResult = await concertService.createTransaction(transactionMock[0]);

      expect(actualResult).toBeTruthy();
      expect(mockTransactionEntity.save).toHaveBeenCalledTimes(1);
    });

    it('should return false if the transaction is not created', async () => {
      mockTransactionEntity.save.mockResolvedValue(null);

      const actualResult = await concertService.createTransaction(transactionMock[0]);

      expect(actualResult).toBeFalsy();
      expect(mockTransactionEntity.save).toHaveBeenCalledTimes(1);
    });
  });

});
