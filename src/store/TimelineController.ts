import { createStore } from 'jotai'
import moment from 'moment-timezone'
import { getTimestamp } from '../helpers/time'
import { configAtom, containerAtom, scrollLeftAtom, zoomAtom } from './store'

export class TimelineController {
  __store: ReturnType<typeof createStore>

  constructor() {
    this.__store = createStore()
  }

  get containerWidth(): number {
    return this.__store.get(containerAtom)?.current?.clientWidth || 0
  }

  get containerScrollLeft(): number {
    return this.__store.get(containerAtom)?.current?.scrollLeft || 0
  }

  get timelineWidth(): number {
    const padding = this.__store.get(configAtom).paddingX * 2
    return (this.containerWidth - padding) * this.zoom + padding
  }

  get config() {
    return this.__store.get(configAtom)
  }

  get zoom(): number {
    return this.__store.get(zoomAtom)
  }

  __zoomByFactor(factor: number) {
    const padding = this.config.paddingX * 2

    const scrollFactor = this.containerScrollLeft / this.timelineWidth
    const visibleFactor = this.containerWidth / this.timelineWidth

    const newTimelineWidth = (this.containerWidth - padding) * factor + padding
    const newVisibleSize = newTimelineWidth * visibleFactor

    const newScroll = scrollFactor * newTimelineWidth + (newVisibleSize - this.containerWidth) / 2

    this.__store.set(zoomAtom, factor)
    this.__store.set(scrollLeftAtom, newScroll)
  }

  zoomIn(factor: number = 0.5) {
    this.__zoomByFactor(this.zoom * (1 + factor))
  }

  zoomOut(factor: number = 0.5) {
    this.__zoomByFactor(Math.max(1, this.zoom / (1 + factor)))
  }

  fit(from: string, to: string) {
    const fromTs = getTimestamp(from)
    const toTs = getTimestamp(to)

    const padding = this.config.paddingX * 2
    const spaceToFit = this.containerWidth - padding

    const totalDuration = moment(this.config.end).diff(this.config.start)
    const durationFromStart = moment(fromTs).diff(this.config.start)
    const duration = moment(toTs).diff(fromTs)

    const newSpace = spaceToFit * (totalDuration / duration)
    const newZoom = newSpace / spaceToFit
    const newScroll = newSpace * (durationFromStart / totalDuration)

    this.__store.set(zoomAtom, newZoom)
    this.__store.set(scrollLeftAtom, Math.max(0, newScroll))
  }
}
