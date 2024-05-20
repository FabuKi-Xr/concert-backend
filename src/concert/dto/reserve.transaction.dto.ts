import { Action } from '../.types';

export interface ReserveTransactionDto {
  concertName: string; 
  userId: string;
  username: string;
  action: Action;
  datetime: string;
}

export interface ReserveTransactionData extends ReserveTransactionDto {
  id: string;
}
