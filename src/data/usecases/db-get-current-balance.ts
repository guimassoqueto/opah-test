import { type GetCurrentBalanceRepository } from '../interfaces/database/transaction/get-current-balance-repository'
import { type GetCurrentBalance } from '../../domain/usecases/get-current-balance'

export class DbGetCurrentBalance implements GetCurrentBalance {
  constructor (
    private readonly getCurrentBalanceRepository: GetCurrentBalanceRepository
  ) {}

  async get (): Promise<number> {
    const balance = await this.getCurrentBalanceRepository.get()
    return balance
  }
}
