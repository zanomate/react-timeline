import { Provider, useAtomValue } from 'jotai'
import { DetailedHTMLProps, HTMLAttributes, MutableRefObject, ReactNode, useEffect, useRef } from 'react'
import { getTimestamp } from '../helpers/time'
import { useInternalTimelineWidth } from '../helpers/useInternalTimelineWidth'
import { configAtom, containerAtom, scrollAtom } from '../store/store'
import { getDefaultTimelineController, TimelineController } from '../store/TimelineController'

interface OuterContainerProps {
  onRefSet: (ref: MutableRefObject<HTMLDivElement>) => void
  children?: ReactNode
}

const OuterContainer = (props: OuterContainerProps) => {
  const { onRefSet, children } = props

  const containerRef = useRef<HTMLDivElement>(null)
  const scrollLeft = useAtomValue(scrollAtom)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft
    }
  }, [scrollLeft])

  return (
    <div
      ref={(ref) => {
        if (!containerRef.current) {
          containerRef.current = ref
          onRefSet(containerRef)
        }
      }}
      style={{ width: '100%', height: '100%', overflowX: 'scroll' }}
    >
      {children}
    </div>
  )
}

interface InnerContainerProps {
  children?: ReactNode
}

const InnerContainer = (props: InnerContainerProps) => {
  const { children } = props

  const width = useInternalTimelineWidth()

  return (
    <div
      style={{
        boxSizing: 'border-box',
        position: 'relative',
        width,
        height: '100%',
        overflowX: 'hidden',
      }}
    >
      {children}
    </div>
  )
}

export interface TimelineProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, any> {
  controller?: TimelineController
  start: string
  end: string
  paddingX?: number
  children?: ReactNode
}

export const Timeline = (props: TimelineProps) => {
  const { controller = getDefaultTimelineController(), start, end, paddingX = 0, children, ...otherProps } = props

  useEffect(() => {
    controller.__store.set(configAtom, { start: getTimestamp(start), end: getTimestamp(end), paddingX })
  }, [start, end, paddingX])

  return (
    <Provider store={controller.__store}>
      <div {...otherProps}>
        <OuterContainer
          onRefSet={(ref) => {
            controller.__store.set(containerAtom, ref)
            controller.__store.set(scrollAtom, 0)
          }}
        >
          <InnerContainer>{children}</InnerContainer>
        </OuterContainer>
      </div>
    </Provider>
  )
}
