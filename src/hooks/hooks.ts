// import { Atom } from 'jotai'
// import moment from 'moment-timezone'
// import { MutableRefObject } from 'react'
// import { getTimestamp } from '../helpers/time'
// import { configAtom, containerAtom, scrollAtom, TimelineConfig, zoomAtom } from '../store/store'
// import { TimelineController } from '../store/TimelineController'
//
// const getStoreValue = <Value>(store: TimelineController, atom: Atom<Value>) => store.__store.get(atom)
//
// const computeContainerWidth = (container: MutableRefObject<HTMLDivElement>) => container.current?.clientWidth || 0
//
// const computeContainerScrollLeft = (container: MutableRefObject<HTMLDivElement>) => container.current?.scrollLeft || 0
//
// const computeTimelineWidth = (container: MutableRefObject<HTMLDivElement>, config: TimelineConfig, zoom: number) => {
//   const padding = config.paddingX * 2
//   const containerWidth = computeContainerWidth(container)
//   return (containerWidth - padding) * zoom + padding
// }
//
// export const useTimelineZoomByFactor = (store: TimelineController) => (factor: number) => {
//   const container = getStoreValue(store, containerAtom)
//   const config = getStoreValue(store, configAtom)
//   const zoom = getStoreValue(store, zoomAtom)
//
//   const containerWidth = computeContainerWidth(container)
//   const containerScrollLeft = computeContainerScrollLeft(container)
//   const timelineWidth = computeTimelineWidth(container, config, zoom)
//
//   const padding = config.paddingX * 2
//
//   const scrollFactor = containerScrollLeft / timelineWidth
//   const visibleFactor = containerWidth / timelineWidth
//
//   const newTimelineWidth = (containerWidth - padding) * factor + padding
//   const newVisibleSize = newTimelineWidth * visibleFactor
//
//   const newScroll = scrollFactor * newTimelineWidth + (newVisibleSize - containerWidth) / 2
//
//   store.__store.set(zoomAtom, factor)
//   store.__store.set(scrollAtom, newScroll)
// }
//
// export const useTimelineZoomIn = (store: TimelineController) => {
//   const zoomByFactor = useTimelineZoomByFactor(store)
//   return (factor: number = 0.5) => {
//     zoomByFactor(store.__zoom * (1 + factor))
//   }
// }
//
// export const useTimelineZoomOut = (store: TimelineController) => {
//   const zoomByFactor = useTimelineZoomByFactor(store)
//   return (factor: number = 0.5) => {
//     zoomByFactor(Math.max(1, store.__zoom / (1 + factor)))
//   }
// }
//
// export const useTimelineFit = (store: TimelineController) => (from: string, to: string) => {
//   const config = getStoreValue(store, configAtom)
//   const container = getStoreValue(store, containerAtom)
//
//   const containerWidth = computeContainerWidth(container)
//
//   const fromTs = getTimestamp(from)
//   const toTs = getTimestamp(to)
//
//   const padding = config.paddingX * 2
//   const spaceToFit = containerWidth - padding
//
//   const totalDuration = moment(config.end).diff(config.start)
//   const durationFromStart = moment(fromTs).diff(config.start)
//   const duration = moment(toTs).diff(fromTs)
//
//   const newSpace = spaceToFit * (totalDuration / duration)
//   const newZoom = newSpace / spaceToFit
//   const newScroll = newSpace * (durationFromStart / totalDuration)
//
//   store.__store.set(zoomAtom, newZoom)
//   store.__store.set(scrollAtom, Math.max(0, newScroll))
// }
