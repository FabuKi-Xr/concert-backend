export const concertMock = {
  data: [
    {
      id: '1',
      name: 'Concert 1',
      description:
        'Lorem ipsum dolor sit amet consectetur. Elit purus nam gravida porttitor nibh urna sit ornare a. Proin dolor morbi id ornare aenean non. Fusce dignissim turpis sed non est orci sed in. Blandit ut purus nunc sed donec commodo morbi diam scelerisque.',
      seats: 100,
    },
    {
      id: '2',
      name: 'Concert 2',
      description:
        'Lorem ipsum dolor sit amet consectetur. Elit purus nam gravida porttitor nibh urna sit ornare a. ',
      seats: 100,
    },
  ],
};

export const mockConcertEntity = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  updateOne: jest.fn(),
  deleteOne: jest.fn(),
};
