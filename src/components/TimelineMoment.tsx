import { ReactNode, useContext } from 'react'
import { getTimestamp } from '../helpers/time'
import { useTimelinePosition } from '../helpers/useTimelinePosition'
import { getCssProperties, TimelineRowContext } from '../store/TimelineRowContext'

export interface TimelineMomentProps {
  /** various ISO formats */
  time: string
  children: ReactNode
}

export const TimelineMoment = (props: TimelineMomentProps) => {
  const { time, children } = props

  const { align } = useContext(TimelineRowContext)
  const ts = getTimestamp(time)
  const { left } = useTimelinePosition(ts, ts)

  return <div style={{ position: 'absolute', left, ...getCssProperties(align, 'translateX(-50%)') }}>{children}</div>
}
