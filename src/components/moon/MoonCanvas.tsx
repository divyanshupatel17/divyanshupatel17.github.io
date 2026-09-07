import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import MoonModel from './MoonModel'

type MoonCanvasProps = {
  active: boolean
  allowDrag: boolean
  dpr: number
  onLoaded?: () => void
}

export default function MoonCanvas({ active, allowDrag, dpr, onLoaded }: MoonCanvasProps) {
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={dpr}
      camera={{ fov: 34, position: [0, 0, 4] }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 2, 4]} intensity={1.7} color="#fff2e6" />
      <directionalLight position={[-4, -1.5, -2]} intensity={0.3} color="#e0272a" />
      <Suspense fallback={null}>
        <MoonModel autoRotate={active} allowDrag={allowDrag} onLoaded={onLoaded} />
      </Suspense>
    </Canvas>
  )
}
