import { type CashFlowByDateModel } from '../models/transactions'

export interface CashFlowByDate {
  get: (date: string) => Promise<CashFlowByDateModel>
}
