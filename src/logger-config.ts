import { ENVIRONMENT } from './settings'
import winston, { format, type Logger } from 'winston'
const { combine, timestamp, printf, label } = format

export default function loggerConfig (appLabel: string): Logger {
  const messageFormat: winston.Logform.Format = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}][${level}]: ${message}`
  })
  const timestampFormat = { format: 'DD-MM-YYYY Z HH:mm:ss.SSS' }

  const regex: RegExp = /^p/i

  let level: string
  if (regex.test(ENVIRONMENT)) {
    level = 'info'
  } else {
    level = 'debug'
  }

  return winston.createLogger({
    level,
    format: combine(
      label({ label: appLabel }),
      timestamp(timestampFormat),
      messageFormat
    ),
    transports: [new winston.transports.Console()]
  })
}
