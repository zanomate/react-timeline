import { Atom, createStore, getDefaultStore } from 'jotai'
import { useAtomValue } from 'jotai/index'
import moment from 'moment-timezone'
import { getTimestamp } from '../helpers/time'
import { configAtom, containerAtom, scrollAtom, zoomAtom } from './store'

export interface TimelineStateConfig<Value> {
  store: ReturnType<typeof createStore>
  atom: Atom<Value>
}

class TimelineControllerImplementation {
  __store: ReturnType<typeof createStore>

  constructor(store: ReturnType<typeof createStore>) {
    this.__store = store
  }

  // atom getters

  private get __config() {
    return this.__store.get(configAtom)
  }

  private get __container() {
    return this.__store.get(containerAtom).current
  }

  private get __scroll() {
    return this.__store.get(scrollAtom)
  }

  private get __zoom() {
    return this.__store.get(zoomAtom)
  }

  // utils

  private get __containerWidth() {
    return this.__container.clientWidth || 0 // TODO: check null
  }

  private get __containerScrollLeft() {
    return this.__container.scrollLeft || 0 // TODO: check null
  }

  private get __timelineWidth() {
    const padding = this.__config.paddingX * 2
    return (this.__containerWidth - padding) * this.__zoom + padding
  }

  private ___zoomByFactor(factor: number) {
    const containerWidth = this.__containerWidth
    const containerScrollLeft = this.__containerScrollLeft
    const timelineWidth = this.__timelineWidth

    const padding = this.__config.paddingX * 2

    const scrollFactor = containerScrollLeft / timelineWidth
    const visibleFactor = containerWidth / timelineWidth

    const newTimelineWidth = (containerWidth - padding) * factor + padding
    const newVisibleSize = newTimelineWidth * visibleFactor

    const newScroll = scrollFactor * newTimelineWidth + (newVisibleSize - containerWidth) / 2

    this.__store.set(zoomAtom, factor)
    this.__store.set(scrollAtom, newScroll)
  }

  // public methods

  zoomIn(factor: number = 0.5) {
    this.___zoomByFactor(this.__zoom * (1 + factor))
  }

  zoomOut(factor: number = 0.5) {
    this.___zoomByFactor(Math.max(1, this.__zoom / (1 + factor)))
  }

  fitTimeRange(from: string, to: string) {
    const config = this.__config
    const containerWidth = this.__containerWidth

    const fromTs = getTimestamp(from)
    const toTs = getTimestamp(to)

    const padding = config.paddingX * 2
    const spaceToFit = containerWidth - padding

    const totalDuration = moment(config.end).diff(config.start)
    const durationFromStart = moment(fromTs).diff(config.start)
    const duration = moment(toTs).diff(fromTs)

    const newSpace = spaceToFit * (totalDuration / duration)
    const newZoom = newSpace / spaceToFit
    const newScroll = newSpace * (durationFromStart / totalDuration)

    this.__store.set(zoomAtom, newZoom)
    this.__store.set(scrollAtom, Math.max(0, newScroll))
  }

  // hooks

  useConfig() {
    return useAtomValue(configAtom, { store: this.__store })
  }

  useZoom() {
    return useAtomValue(zoomAtom, { store: this.__store })
  }

  useScroll() {
    return useAtomValue(scrollAtom, { store: this.__store })
  }
}

export type TimelineController = InstanceType<typeof TimelineControllerImplementation>

export const createTimelineController = () => new TimelineControllerImplementation(createStore())

export const getDefaultTimelineController = () => new TimelineControllerImplementation(getDefaultStore())
