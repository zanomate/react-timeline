import moment from 'moment-timezone'

/**
 * Matches a time string in the following formats:
 * - HH:mm
 * - HH:mm:ss
 * - HH:mm:ss.SSS
 */
export const DAYTIME_REGEX = /^(?:[01]\d|2[0-3]):[0-5]\d(:[0-5]\d(\.\d{3})?)?$/

/**
 * Matches any string that "starts" with the format:
 * - YYYY-MM-DD
 */
export const START_TIMESTAMP_REGEX = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])/

export const getTimestamp = (input: string): string => {
  if (['24:00', '24:00:00'].includes(input)) {
    return moment().startOf('day').add({ d: 1 }).toISOString()
  }
  if (DAYTIME_REGEX.test(input)) {
    return moment(input, 'HH:mm:ss.SSS').toISOString()
  }
  if (START_TIMESTAMP_REGEX.test(input)) {
    const ts = moment(input)
    if (ts.isValid()) {
      return ts.toISOString()
    }
  }
  throw new Error(`Invalid input: ${input}`)
}
