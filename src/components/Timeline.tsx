import { Provider, useAtomValue } from 'jotai'
import { DetailedHTMLProps, HTMLAttributes, MutableRefObject, ReactNode, useEffect, useRef } from 'react'
import { getTimestamp } from '../helpers/time'
import { useTimelineWidth } from '../helpers/useTimelineWidth'
import { configAtom, containerAtom, scrollLeftAtom, zoomAtom } from '../store/store'
import { TimelineController } from '../store/TimelineController'

interface OuterContainerProps {
  onRefSet: (ref: MutableRefObject<HTMLDivElement>) => void
  children?: ReactNode
}

const OuterContainer = (props: OuterContainerProps) => {
  const { onRefSet, children } = props

  const containerRef = useRef<HTMLDivElement>(null)

  const zoom = useAtomValue(zoomAtom)
  const scrollLeft = useAtomValue(scrollLeftAtom)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft
    }
  }, [zoom])

  return (
    <div
      ref={(ref) => {
        containerRef.current = ref
        onRefSet(containerRef)
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

  const width = useTimelineWidth()

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
  const { controller = new TimelineController(), start, end, paddingX = 0, children, ...otherProps } = props

  useEffect(() => {
    controller.__store.set(configAtom, { start: getTimestamp(start), end: getTimestamp(end), paddingX })
  }, [start, end, paddingX])

  return (
    <Provider store={controller.__store}>
      <div {...otherProps}>
        <OuterContainer
          onRefSet={(ref) => {
            controller.__store.set(containerAtom, ref)
            controller.__store.set(scrollLeftAtom, 0)
          }}
        >
          <InnerContainer>{children}</InnerContainer>
        </OuterContainer>
      </div>
    </Provider>
  )
}
