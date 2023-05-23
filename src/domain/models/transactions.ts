export type DebitOrCredit = 'D' | 'C'

export interface TransactionModel {
  id: string
  amount: number
  type: DebitOrCredit
  datetime: Date
}
