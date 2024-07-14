import { ReactNode, useContext } from 'react'
import { getTimestamp } from '../helpers/time'
import { getCssProperties, TimelineRowContext } from '../store/TimelineRowContext'
import { useTimelinePosition } from '../helpers/useTimelinePosition'

export interface TimelineAreaProps {
  /** various ISO formats */
  from: string
  /** various ISO formats */
  to: string
  children: ReactNode
}

export const TimelineArea = (props: TimelineAreaProps) => {
  const { from, to, children } = props

  const { align } = useContext(TimelineRowContext)
  const { left, width } = useTimelinePosition(getTimestamp(from), getTimestamp(to))

  return (
    <div
      style={{
        position: 'absolute',
        left,
        width,
        ...getCssProperties(align),
      }}
    >
      {children}
    </div>
  )
}
