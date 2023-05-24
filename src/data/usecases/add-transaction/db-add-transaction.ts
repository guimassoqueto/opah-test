import { type TransactionModel } from '../../../domain/models/transactions'
import { type AddTransactionRepository } from '../../interfaces/database/transaction/add-transaction-repository'
import { type AddTransaction, type AddTransactionModel } from '../../../domain/usecases/add-transaction'

export class DbAddTransaction implements AddTransaction {
  constructor (
    private readonly addTransactionRepository: AddTransactionRepository
  ) {}

  async add (transactionData: AddTransactionModel): Promise<TransactionModel> {
    const transaction = await this.addTransactionRepository.add(transactionData)
    return transaction
  }
}
