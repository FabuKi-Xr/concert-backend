import { Action } from "../.types"

export interface ReserveTransactionDto {
    concertName: string,
    username: string
    action: Action,
    datetime: string
}

export interface ReserveTransactionData extends ReserveTransactionDto {
    id: string
}