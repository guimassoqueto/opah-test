import { type CashFlowByDateRepository } from '../interfaces/database/transaction'
import { type CashFlowByDate } from '../../domain/usecases/cashflow-by-date'
import { type CashFlowByDateModel } from '../../domain/models/transactions'

export class DbCashFlowByDate implements CashFlowByDate {
  constructor (
    private readonly cashFlowByDateRepository: CashFlowByDateRepository
  ) {}

  async get (date: string): Promise<CashFlowByDateModel> {
    const cashFlow = this.cashFlowByDateRepository.get(date)
    return await cashFlow
  }
}
