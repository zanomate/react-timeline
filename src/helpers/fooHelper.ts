import { Foo } from '../types/Foo'

export interface FooOptions {
  fooNumber?: number
  fooString?: string
}

export const fooHelper = (options: FooOptions): Foo => {
  return {
    bar: options.fooString,
    baz: options.fooNumber,
  }
}
