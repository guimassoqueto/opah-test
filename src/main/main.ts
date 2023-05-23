import { PostgresHelper } from '../infra/database/postgres/helpers/postgres-helper'

const postgres = PostgresHelper.getInstance()

postgres.connect()
  .then(() => {
    console.info('ok')
  })
  .catch(error => {
    console.error(error)
  })
