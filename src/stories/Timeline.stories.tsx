import type { Meta, StoryObj } from '@storybook/react'
import moment from 'moment-timezone'
import { Timeline } from '../components/Timeline'
import { TimelineArea } from '../components/TimelineArea'
import { TimelineMoment } from '../components/TimelineMoment'
import { TimelineRow } from '../components/TimelineRow'
import { TimelinePattern } from '../components/TimelinePattern'
import { TimelineController } from '../store/TimelineController'
import { Card } from './fragments/Card'
import { Circle } from './fragments/Circle'
import { Line } from './fragments/Line'
import { ScaleHour } from './fragments/ScaleHour'
import { ScaleQuarter } from './fragments/ScaleQuarter'

const meta: Meta<typeof Timeline> = {
  title: 'components/Timeline',
  component: Timeline,
}

export default meta
type Story = StoryObj<typeof Timeline>

const controller = new TimelineController()

export const Base: Story = {
  render: () => (
    <div>
      <Timeline controller={controller} start="2021-01-01T00:00:00" end="2021-01-01T23:59:00">
        <TimelineRow height={80}>
          <TimelineArea from="2021-01-01T08:00:00" to="2021-01-01T15:30:00">
            <Line color="#666666" />
          </TimelineArea>
          <TimelineMoment time="2021-01-01T11:15:00">
            <Circle color="#f25d52" />
          </TimelineMoment>
          <TimelineArea from="2021-01-01T12:00:00" to="2021-01-01T12:45:00">
            <Card color="#55d49f" />
          </TimelineArea>
          <TimelineMoment time="2021-01-01T14:20:00">
            <Circle color="#55d49f" />
          </TimelineMoment>
          <TimelineArea from="2021-01-01T09:00:00" to="2021-01-01T09:30:00">
            <Card color="#55d49f" />
          </TimelineArea>
        </TimelineRow>
      </Timeline>
      <button
        onClick={() => {
          controller.zoomOut(0.5)
        }}
      >
        zoom -
      </button>
      <button
        onClick={() => {
          controller.zoomIn(0.5)
        }}
      >
        zoom +
      </button>
    </div>
  ),
}

export const Scale: Story = {
  render: () => (
    <div>
      <Timeline controller={controller} start="00:00:00" end="24:00:00" paddingX={50}>
        <TimelineRow height={40} align="top" style={{ borderTop: '1px solid #ccc' }}>
          <TimelinePattern
            gap="PT15M"
            renderAt={(ts, zoom) => {
              const m = moment(ts)
              if (m.minutes() === 0 && m.hours() % 2 === 0) return <ScaleHour text={m.format('H')} />
              if (m.minutes() === 0 && zoom > 1.1) return <ScaleHour text={m.format('H')} />
              return <ScaleQuarter />
            }}
          />
        </TimelineRow>
        <TimelineRow height={80}>
          <TimelineArea from="08:00:00" to="15:30:00">
            <Line color="#666666" />
          </TimelineArea>
          <TimelineMoment time="11:15:00">
            <Circle color="#f25d52" />
          </TimelineMoment>
          <TimelineArea from="12:00:00" to="12:45:00">
            <Card color="#55d49f" />
          </TimelineArea>
          <TimelineMoment time="14:20:00">
            <Circle color="#55d49f" />
          </TimelineMoment>
          <TimelineArea from="09:00:00" to="09:30:00">
            <Card color="#55d49f" />
          </TimelineArea>
        </TimelineRow>
      </Timeline>
      <button
        onClick={() => {
          controller.zoomOut(0.5)
        }}
      >
        zoom -
      </button>
      <button
        onClick={() => {
          controller.zoomIn(0.5)
        }}
      >
        zoom +
      </button>
      <button
        onClick={() => {
          controller.fit('12:00:00', '14:30:00')
        }}
      >
        FIT
      </button>
    </div>
  ),
}
