import { fooHelper } from './fooHelper'

describe('fooHelper', () => {

  it('returns an object containing a "bar" property, with the value passed in "fooString"', () => {
    expect(fooHelper({ fooString: 'test' })).toHaveProperty('bar', 'test')
  })

  it('returns an object containing a "baz" property, with the value passed in "fooNumber"', () => {
    expect(fooHelper({ fooNumber: 123 })).toHaveProperty('baz', 123)
  })
})
