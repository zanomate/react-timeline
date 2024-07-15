import { useAtomValue } from 'jotai'
import { configAtom, containerAtom, zoomAtom } from '../store/store'

export const useInternalTimelineWidth = () => {
  const container = useAtomValue(containerAtom)
  const { paddingX } = useAtomValue(configAtom)
  const zoom = useAtomValue(zoomAtom)

  const containerWidth = container.current?.clientWidth || 0
  const padding = paddingX * 2

  return (containerWidth - padding) * zoom + padding
}
