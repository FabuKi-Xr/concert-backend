import { ReserveTransactionData } from "../dto";

export const transactionMock
: ReserveTransactionData[] = [
    {
        id: '1',
        userId: 'a20ac845-5259-4f17-a029-972f1a89138c',
        username: 'user1',
        concertName: 'con1',
        datetime: "12/09/2024 15:00:00",
        action: "Reserve"
    },
    {
        id: '2',
        userId: 'a20ac845-5259-4f17-a029-972f1a89138c',
        username: 'user2',
        concertName: 'con1',
        datetime: "12/09/2024 16:00:00",
        action: "Cancel" 
    }
]

export const mockTransactionEntity = {
    find: jest.fn().mockResolvedValue(transactionMock),
    findOne: jest.fn(),
    save: jest.fn(),
    updateOne: jest.fn(),
    delete: jest.fn(),
};