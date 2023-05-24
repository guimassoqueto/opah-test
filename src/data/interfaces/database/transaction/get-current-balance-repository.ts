export interface GetCurrentBalanceRepository {
  get: () => Promise<number>
}
