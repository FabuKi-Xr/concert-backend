export interface ConcertCreateRequest {
  name: string;
  description: string;
  seats: number;
}

export interface ConcertData extends ConcertCreateRequest {
  id: string;
}
