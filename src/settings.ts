import * as dotenv from 'dotenv'
dotenv.config()

export const ENVIRONMENT = process.env.ENVIRONMENT ?? 'dev'
export const POSTGRES_PORT = process.env.POSTGRES_PORT ?? '5432'
export const POSTGRES_DB = process.env.POSTGRES_DB ?? 'postgres'
export const POSTGRES_USER = process.env.POSTGRES_USER ?? 'postgres'
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD ?? 'password'
