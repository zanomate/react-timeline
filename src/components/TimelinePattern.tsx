import { useAtomValue } from 'jotai'
import moment from 'moment-timezone'
import { ReactNode } from 'react'
import { getTimestamp } from '../helpers/time'
import { configAtom, zoomAtom } from '../store/store'
import { TimelineMoment } from './TimelineMoment'

export interface TimelinePatternProps {
  /** ISO durations */
  gap: string
  /** various ISO formats */
  from?: string
  /** various ISO formats */
  to?: string
  renderAt: (timestamp: string, zoom: number) => ReactNode
}

export const TimelinePattern = (props: TimelinePatternProps) => {
  const { gap, from, to, renderAt } = props

  const { start, end } = useAtomValue(configAtom)
  const zoom = useAtomValue(zoomAtom)

  const firstTs = moment(from ? getTimestamp(from) : start).toISOString()
  const lastTs = moment(to ? getTimestamp(to) : end).toISOString()

  const allTs: string[] = []
  const currentMoment = moment(firstTs)
  const gapDuration = moment.duration(gap)
  while (currentMoment.isSameOrBefore(lastTs)) {
    allTs.push(currentMoment.toISOString())
    currentMoment.add(gapDuration)
  }

  return (
    <>
      {allTs.map((ts) => (
        <TimelineMoment time={ts} key={ts}>
          {renderAt(ts, zoom)}
        </TimelineMoment>
      ))}
    </>
  )
}
