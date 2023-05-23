export type TransactionType = 'D' | 'C'

export interface TransactionModel {
  id: string
  amount: number
  type: TransactionType
  datetime: Date
}
