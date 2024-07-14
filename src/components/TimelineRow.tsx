import { merge } from 'lodash'
import { DetailedHTMLProps, HTMLAttributes, useMemo } from 'react'
import { getFlexAlignItems, TimelineRowAlign, TimelineRowContext } from '../store/TimelineRowContext'

export interface TimelineRowProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  height: number
  align?: TimelineRowAlign
}

export const TimelineRow = (props: TimelineRowProps) => {
  const { height, align = 'center', children, ...otherProps } = props

  const context = useMemo(() => ({ height, align }), [height, align])

  return (
    <TimelineRowContext.Provider value={context}>
      <div
        {...merge(otherProps, {
          style: {
            height,
            display: 'flex',
            flexDirection: 'row',
            alignItems: getFlexAlignItems(align),
          },
        })}
      >
        <div
          style={{
            width: '100%',
            position: 'relative',
          }}
        >
          {children}
        </div>
      </div>
    </TimelineRowContext.Provider>
  )
}
