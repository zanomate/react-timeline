import { Property } from 'csstype'
import { createContext, CSSProperties } from 'react'

export type TimelineRowAlign = 'center' | 'top' | 'bottom' | 'stretch'

export interface TimelineRowContextValue {
  height: number
  align: TimelineRowAlign
}

export const TimelineRowContext = createContext<TimelineRowContextValue>({
  height: 0,
  align: 'center',
})

export const getFlexAlignItems = (align: TimelineRowAlign) => {
  switch (align) {
    case 'top':
      return 'flex-start'
    case 'bottom':
      return 'flex-end'
    case 'stretch':
      return 'stretch'
    case 'center':
    default:
      return 'center'
  }
}

export const getCssProperties = (align: TimelineRowAlign, baseTransform: Property.Transform = ''): CSSProperties => {
  switch (align) {
    case 'top':
      return { top: 0, transform: baseTransform }
    case 'bottom':
      return { bottom: 0, transform: baseTransform }
    case 'stretch':
      return { top: 0, bottom: 0, transform: baseTransform }
    case 'center':
    default:
      return { transform: `${baseTransform} translateY(-50%)` }
  }
}
