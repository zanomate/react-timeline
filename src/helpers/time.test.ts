import { getTimestamp } from './time'

describe('helpers/time', () => {
  describe('getTimestamp', () => {
    it('should not accept HH, MM or DD format', () => {
      expect(() => getTimestamp('00')).toThrow()
      expect(() => getTimestamp('05')).toThrow()
      expect(() => getTimestamp('12')).toThrow()
      expect(() => getTimestamp('15')).toThrow()
      expect(() => getTimestamp('23')).toThrow()
      expect(() => getTimestamp('24')).toThrow()
      expect(() => getTimestamp('24')).toThrow()
      expect(() => getTimestamp('25')).toThrow()
      expect(() => getTimestamp('99')).toThrow()
      expect(() => getTimestamp('9')).toThrow()
    })

    it('should accept HH:mm format', () => {
      expect(() => getTimestamp('00:00')).not.toThrow()
      expect(() => getTimestamp('05:23')).not.toThrow()
      expect(() => getTimestamp('12:35')).not.toThrow()
      expect(() => getTimestamp('15:03')).not.toThrow()
      expect(() => getTimestamp('23:59')).not.toThrow()
      expect(() => getTimestamp('24:00')).not.toThrow()
      expect(() => getTimestamp('24:15')).toThrow()
      expect(() => getTimestamp('25:35')).toThrow()
      expect(() => getTimestamp('99:99')).toThrow()
      expect(() => getTimestamp('99:9')).toThrow()
      expect(() => getTimestamp('9:9')).toThrow()
    })

    it('should accept HH:mm:ss format', () => {
      expect(() => getTimestamp('00:00:00')).not.toThrow()
      expect(() => getTimestamp('05:23:12')).not.toThrow()
      expect(() => getTimestamp('12:35:35')).not.toThrow()
      expect(() => getTimestamp('15:03:05')).not.toThrow()
      expect(() => getTimestamp('23:59:59')).not.toThrow()
      expect(() => getTimestamp('24:00:00')).not.toThrow()
      expect(() => getTimestamp('24:15:15')).toThrow()
      expect(() => getTimestamp('12:35:72')).toThrow()
      expect(() => getTimestamp('99:99:99')).toThrow()
      expect(() => getTimestamp('99:99:9')).toThrow()
      expect(() => getTimestamp('99:9:9')).toThrow()
      expect(() => getTimestamp('9:9:9')).toThrow()
    })

    it('should accept HH:mm:ss.sss format', () => {
      expect(() => getTimestamp('00:00:00.000')).not.toThrow()
      expect(() => getTimestamp('05:23:12.123')).not.toThrow()
      expect(() => getTimestamp('12:35:35.025')).not.toThrow()
      expect(() => getTimestamp('15:03:05.005')).not.toThrow()
      expect(() => getTimestamp('23:59:59.999')).not.toThrow()
      expect(() => getTimestamp('24:00:00.000')).toThrow()
      expect(() => getTimestamp('24:15:15.563')).toThrow()
      expect(() => getTimestamp('12:35:72.4567')).toThrow()
      expect(() => getTimestamp('99:99:99.99')).toThrow()
      expect(() => getTimestamp('99:99:9.9')).toThrow()
      expect(() => getTimestamp('99:9:9.9')).toThrow()
      expect(() => getTimestamp('9:9:9.9')).toThrow()
    })

    it('should not accept YYYY format', () => {
      expect(() => getTimestamp('1923')).toThrow()
      expect(() => getTimestamp('2024')).toThrow()
    })

    it('should not accept YYYY-MM format', () => {
      expect(() => getTimestamp('1923-05')).toThrow()
      expect(() => getTimestamp('2024-12')).toThrow()
      expect(() => getTimestamp('123-5')).toThrow()
      expect(() => getTimestamp('12-3')).toThrow()
    })

    it('should not accept MM-DD format', () => {
      expect(() => getTimestamp('05-25')).toThrow()
      expect(() => getTimestamp('12-31')).toThrow()
      expect(() => getTimestamp('18-40')).toThrow()
    })

    it('should accept YYYY-MM-DD format', () => {
      expect(() => getTimestamp('1990-01-01')).not.toThrow()
      expect(() => getTimestamp('2020-12-31')).not.toThrow()
      expect(() => getTimestamp('1947-05-08')).not.toThrow()
      expect(() => getTimestamp('1947-25-30')).toThrow()
      expect(() => getTimestamp('1947-12-99')).toThrow()
      expect(() => getTimestamp('9999-99-99')).toThrow()
      expect(() => getTimestamp('123-12-12')).toThrow()
      expect(() => getTimestamp('1234-1-12')).toThrow()
      expect(() => getTimestamp('1234-12-1')).toThrow()
      expect(() => getTimestamp('1234-1-1')).toThrow()
      expect(() => getTimestamp('123-1-1')).toThrow()
    })

    it('should accept other valid formats that starts with YYYY-MM-DD format', () => {
      expect(() => getTimestamp('1990-01-01T12')).not.toThrow()
      expect(() => getTimestamp('1990-01-01T12:35')).not.toThrow()
      expect(() => getTimestamp('1990-01-01T12:35:25')).not.toThrow()
      expect(() => getTimestamp('1990-01-01T12:35:25.123')).not.toThrow()
      expect(() => getTimestamp('1990-01-01T12:35:25.123Z')).not.toThrow()
      expect(() => getTimestamp('1990-01-01T12:35:25.123+00:00')).not.toThrow()
      expect(() => getTimestamp('1990-01-01T12:35:25.123+01:25')).not.toThrow()
      expect(() => getTimestamp('1990-01-01T12:35:25.123+14:00')).not.toThrow()
      expect(() => getTimestamp('1990-01-01T12:35:25.123-02:00')).not.toThrow()
    })
  })
})
