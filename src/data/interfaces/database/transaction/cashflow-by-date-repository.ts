import { type CashFlowByDateModel } from '../../../../domain/models/transactions'

export interface CashFlowByDateRepository {
  get: (date: string) => Promise<CashFlowByDateModel>
}
