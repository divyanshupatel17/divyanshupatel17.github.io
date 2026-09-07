import { Suspense, lazy, useEffect, useMemo, useState } from 'react'
import MoonFallback from './MoonFallback'
import { useInView } from '../../hooks/useInView'
import { usePageVisible } from '../../hooks/usePageVisible'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { isCoarsePointer, isWebGLAvailable } from '../../utils/webgl'

const MoonCanvas = lazy(() => import('./MoonCanvas'))

export default function Moon() {
  const { ref, inView } = useInView<HTMLDivElement>()
  const pageVisible = usePageVisible()
  const reducedMotion = usePrefersReducedMotion()
  const [webglOk, setWebglOk] = useState(true)
  const [shouldLoad, setShouldLoad] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setWebglOk(isWebGLAvailable())
  }, [])

  useEffect(() => {
    if (inView && !reducedMotion && webglOk) setShouldLoad(true)
  }, [inView, reducedMotion, webglOk])

  const allowDrag = useMemo(() => !isCoarsePointer(), [])
  const dpr = useMemo(() => {
    const cap = isCoarsePointer() ? 1.5 : 2
    return Math.min(window.devicePixelRatio || 1, cap)
  }, [])

  const active = inView && pageVisible && !reducedMotion
  const showCanvas = webglOk && !reducedMotion && shouldLoad

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-out"
        style={{ opacity: loaded ? 0 : 1 }}
      >
        <MoonFallback />
      </div>
      {showCanvas && (
        <div
          className="absolute inset-0 transition-opacity duration-700 ease-out"
          style={{ opacity: loaded ? 1 : 0, pointerEvents: allowDrag && loaded ? 'auto' : 'none' }}
        >
          <Suspense fallback={null}>
            <MoonCanvas active={active} allowDrag={allowDrag} dpr={dpr} onLoaded={() => setLoaded(true)} />
          </Suspense>
        </div>
      )}
    </div>
  )
}
