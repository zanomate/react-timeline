# react-timeline

[![NPM version](https://img.shields.io/npm/v/@znmt/react-timeline.svg)](https://www.npmjs.com/package/@znmt/react-timeline)

`react-timeline` is a React library that provides **highly customizable** components for developing <ins>horizontal timelines</ins>.

## Features

- Completely customizable
- Multiple time formats supported
- Helper functions to manipulate timeline programmatically

## Demo

Look for an **[example](https://codesandbox.io/p/sandbox/react-timeline-fnjgdr)**

## Installation

You can install the library using npm or yarn:

```bash
npm install @znmt/react-timeline
```

```bash
yarn add @znmt/react-timeline
```

## Usage

#### Basic

```jsx
<Timeline start="00:00" end="23:59" paddingX={20}>
  <TimelineRow height={80}>
    <TimelineArea from="08:00" to="15:30">
      <MyAreaComponent />
    </TimelineArea>
    <TimelineMoment moment="11:15">
      <MyMomentComponent />
    </TimelineMoment>
  </TimelineRow>
</Timeline>
```

#### With pattern

```jsx
<Timeline start="00:00" end="23:59" paddingX={20}>
  <TimelineRow height={20}>
    <TimelinePattern
      gap="PT15M"
      renderAt={renderPattern}
    />
  </TimelineRow>
  <TimelineRow height={80}>
    {/* ... */}
  </TimelineRow>
</Timeline>
```

```js
const renderPattern = (timestamp, zoom) => {
  const date = new Date(ts)
  if (date.getMinutes() === 0) return <MyHourComponent text={date.getHours()} />
  if (date.getMinutes() === 30 && zoom > 1.1) return <MyHalfHourComponent text={`${date.getHours()}:${date.getMinutes()}`} />
  return <MyQuarterComponent />
}
```

## Time formats

Every property of the library that represents a time accepts various ISO 8601 formats; specifically:
- A time in one of the following formats: `hh:mm`, `hh:mm:ss`, `hh:mm:ss.SSS`. In this case the day is assumed to be the current day.
- A timestamp that starts with the format `YYYY-MM-DD`, including `YYYY-MM-DDThh:mm`, `YYYY-MM-DDThh:mm:ss`, `YYYY-MM-DDThh:mm:ss.SSSZ`, `YYYY-MM-DDThh:mm:ss.SSS±hh:mm`, and more.

Note that all specified times must be in compatible formats.
For example, specifying that the timeline starts at `2020-01-01T08:00` and ends at `2020-01-01T21:00` and then specifying a moment with `16:00`, that won't be showed because it's assumed to be in a different day (today).

Also, note that the library supports timezones, so remember to always specify coherent timezones.

## Components

### Timeline

The main component that wraps the timeline. It accepts the following props:

| Prop         | Type                   | Required          | Description                                                                                                    |
|--------------|------------------------|-------------------|----------------------------------------------------------------------------------------------------------------|
| `start`      | `string`               | Yes               | The start time of the timeline. It accepts various ISO 8601 formats. See [Time formats](#time-formats)         |
| `end`        | `string`               | Yes               | The end time of the timeline. It accepts various ISO 8601 formats. See [Time formats](#time-formats)           |
| `paddingX`   | `number`               | No (default: `0`) | The horizontal space kept before the start and after the end of the timeline.                                  |
| `controller` | `TimelineController`   | No                | A controller object to manipulate the timeline programmatically. See [TimelineController](#timelinecontroller) |

### TimelineRow

A row inside the timeline. It accepts the following props:

| Prop     | Type                                   | Required               | Description                                      |
|----------|----------------------------------------|------------------------|--------------------------------------------------|
| `height` | `number`                               | Yes                    | The height of the row in pixels.                 |
| `align`  | `top`, `center`, `bottom` or `stretch` | No (default: `center`) | The vertical alignment for the items in the row. |


### TimelineArea

A component that keeps its content in a specific portion of the timeline, representing the specified time-range. It accepts the following props:

| Prop         | Type     | Required | Description                                                                                        |
|--------------|----------|----------|----------------------------------------------------------------------------------------------------|
| `from`       | `string` | Yes      | The start time of the area. It accepts various ISO 8601 formats. See [Time formats](#time-formats) |
| `to`         | `string` | Yes      | The end time of the area. It accepts various ISO 8601 formats. See [Time formats](#time-formats)   |

### TimelineMoment

A component that positions its content in a specific point of the timeline, representing the specified time moment. It accepts the following props:

| Prop   | Type     | Required | Description                                                                                    |
|--------|----------|----------|------------------------------------------------------------------------------------------------|
| `time` | `string` | Yes      | The time of the moment. It accepts various ISO 8601 formats. See [Time formats](#time-formats) |

### TimelinePattern

A component that allows rendering different contents in the timeline at regular intervals. It accepts the following props:

| Prop      | Type       | Required                         | Description                                                                                                       |
|-----------|------------|----------------------------------|-------------------------------------------------------------------------------------------------------------------|
| `gap`     | `string`   | Yes                              | The interval between each rendered element. It accepts ISO 8601 duration as format.                               |
| `from`    | `string`   | No (detault is timeline `start`) | The start time of the pattern. It accepts various ISO 8601 formats. See [Time formats](#time-formats)             |
| `to`      | `string`   | No (detault is timeline `end`)   | The end time of the pattern. It accepts various ISO 8601 formats. See [Time formats](#time-formats)               |
| `rendeAt` | `Function` | Yes                              | Render function that takes the current zoom level and the timestamp of the moment in which item will be rendered. |

### TimelineController

An object to manipulate the timeline programmatically. Pass it to the `Timeline` component to control it.

```jsx
import { createTimelineController } from '@znmt/react-timeline'

const controller = createTimelineController()

const MyComp = () => {
  return (
    <>
      <Timeline start="00:00" end="23:59" controller={controller}>
        {/* ... */}
      </Timeline>
      <button onClick={() => controller.zoomIn()}>Zoom in</button>
      <button onClick={() => controller.zoomOut()}>Zoom out</button>
    </>
  )
}
```

#### zoomIn

Increase the zoom level of the timeline by a specified factor.

| Param         | Type     | Required            | Description                                                              |
|---------------|----------|---------------------|--------------------------------------------------------------------------|
| `factor`      | `number` | No (default: `0.5`) | A number between 0 and 1 representing the factor to increase the zoom by |

#### zoomOut

Decrease the zoom level of the timeline by a specified factor.

| Param         | Type     | Required            | Description                                                              |
|---------------|----------|---------------------|--------------------------------------------------------------------------|
| `factor`      | `number` | No (default: `0.5`) | A number between 0 and 1 representing the factor to decrease the zoom by |

#### fit

Adjust the zoom level and the scroll position of the timeline to fit the specified time range.

| Param         | Type     | Required | Description                                                                                                |
|---------------|----------|----------|------------------------------------------------------------------------------------------------------------|
| `from`        | `string` | Yes      | The start time of the range to fit. It accepts various ISO 8601 formats. See [Time formats](#time-formats) |
| `to`          | `string` | Yes      | The end time of the range to fit. It accepts various ISO 8601 formats. See [Time formats](#time-formats)   |

### React to timeline changes

You can react to timeline changes by using a series of custom hooks provided by the controller.

```jsx
import { useTimelineState } from '@znmt/react-timeline'

const MyComp = () => {
  const zoom = controller.useZoom()
  const scroll = controller.useScroll()
  
  return (
    <>
      <Timeline start="00:00" end="23:59" controller={controller}>
        {/* ... */}
      </Timeline>
      <span>Zoom level: {zoom}</span>
      <span>Current scroll: {scroll}</span>
    </>
  )
}
```

---

Made with ❤️ by [ZNMT](http://github.com/zanomate)
