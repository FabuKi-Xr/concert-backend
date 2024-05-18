import { Test, TestingModule } from '@nestjs/testing';
import { ConcertService } from './concert.service';
import { Concert } from './entity/concert.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { concertMock, mockConcertEntity } from './mock/concert.mock';

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
      })
    });

  });
});
