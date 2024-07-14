import { useAtomValue } from 'jotai/index'
import moment from 'moment-timezone'
import { configAtom } from '../store/store'
import { useTimelineWidth } from './useTimelineWidth'

export const useTimelinePosition = (from: string, to: string) => {
  const { start, end, paddingX } = useAtomValue(configAtom)
  const timelineWidth = useTimelineWidth()
  const padding = paddingX * 2

  const totalDuration = moment(end).diff(start)
  const durationFromStart = moment(from).diff(start)
  const duration = moment(to).diff(from)
  const width = (timelineWidth - padding) * (duration / totalDuration)
  const left = paddingX + (timelineWidth - padding) * (durationFromStart / totalDuration)
  return { left, width }
}
