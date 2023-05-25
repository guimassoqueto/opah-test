export type TransactionType = 'D' | 'C'

export interface TransactionModel {
  id: string
  amount: number
  type: TransactionType
  datetime: Date
}

export interface CashFlow {
  id: string
  amount: number
  datetime: Date
}

export interface CashFlowByDateModel {
  date: string
  credits: CashFlow[]
  debits: CashFlow[]
}
