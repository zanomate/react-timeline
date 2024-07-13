import { FooOptions } from '../helpers/fooHelper'

export interface FooCompProps {
  fooOptions: FooOptions
}

export const FooComp = (props: FooCompProps) => {
  const { fooOptions } = props

  return (
    <span>{fooOptions.fooString || 'foo'}</span>
  )
}
