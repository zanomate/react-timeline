import { atom } from 'jotai'
import { MutableRefObject } from 'react'

export interface TimelineConfig {
  start: string
  end: string
  paddingX: number
}

export const configAtom = atom<TimelineConfig>({
  start: '',
  end: '',
  paddingX: 0,
})
export const containerAtom = atom<MutableRefObject<HTMLDivElement>>({ current: null })
export const scrollLeftAtom = atom<number>(0)
export const zoomAtom = atom<number>(1)
