import { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const MOON_MODEL_URL = '/models/moon_small.glb'
const FULL_ROTATION_SECONDS = 46
const SPHERE_WIDTH_RATIO = 0.82
const SPHERE_CAP_DEPTH = 0.68

type MoonModelProps = {
  autoRotate: boolean
  allowDrag: boolean
  onLoaded?: () => void
}

export default function MoonModel({ autoRotate, allowDrag, onLoaded }: MoonModelProps) {
  const { scene } = useGLTF(MOON_MODEL_URL)
  const group = useRef<THREE.Group>(null)
  const { gl, camera } = useThree()
  const dragging = useRef(false)
  const lastPointer = useRef({ x: 0, y: 0 })
  const velocity = useRef({ x: 0, y: 0 })
  const rotation = useRef({ x: 0, y: 0.4 })
  // Unit vector the idle spin follows, so the moon keeps turning the way the
  // user last flicked it instead of snapping back to a fixed axis.
  const autoAxis = useRef({ x: 0, y: 1 })

  useEffect(() => {
    const g = group.current
    if (!g) return

    const box = new THREE.Box3().setFromObject(g)
    const center = box.getCenter(new THREE.Vector3())
    g.position.sub(center)

    // The mesh is a near-spherical shape; the box diagonal (used by
    // Box3.getBoundingSphere) overestimates its true radius by up to sqrt(3).
    // Half the largest box dimension is a much tighter fit for a sphere.
    const size = box.getSize(new THREE.Vector3())
    const radius = Math.max(size.x, size.y, size.z) / 2

    const perspective = camera as THREE.PerspectiveCamera
    const vFovRad = (perspective.fov * Math.PI) / 180
    // The Moon panel is wide and short (full section width, a sliver of
    // height), so fit the sphere to the HORIZONTAL extent, not vertical, or
    // it renders far too small. Horizontal fov is derived from vertical fov
    // and the canvas aspect ratio.
    const hFovRad = 2 * Math.atan(Math.tan(vFovRad / 2) * perspective.aspect)
    // Sizing off the panel WIDTH (not height) keeps the moon the same relative
    // size at every aspect ratio; the mockup puts its diameter at ~82% of the
    // panel width, so the name stays readable past both edges of the sphere.
    const distance = (radius / Math.sin(hFovRad / 2)) * (1.02 / SPHERE_WIDTH_RATIO)
    perspective.position.set(0, 0, distance)
    perspective.near = Math.max(distance / 100, 0.01)
    perspective.far = distance * 10
    perspective.lookAt(0, 0, 0)
    perspective.updateProjectionMatrix()

    // Only the sphere's top cap should be visible (the moon "rising" behind
    // the footer). The cap depth is measured off the sphere's own radius, not
    // the panel height, or a tall/narrow panel shows the whole ball instead.
    const halfHeightWorld = distance * Math.tan(vFovRad / 2)
    g.position.y -= halfHeightWorld + radius * (1 - SPHERE_CAP_DEPTH)

    onLoaded?.()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!allowDrag) return
    const canvas = gl.domElement

    const handlePointerDown = (event: PointerEvent) => {
      dragging.current = true
      lastPointer.current = { x: event.clientX, y: event.clientY }
      velocity.current = { x: 0, y: 0 }
      canvas.setPointerCapture(event.pointerId)
    }
    const handlePointerMove = (event: PointerEvent) => {
      if (!dragging.current) return
      const dx = event.clientX - lastPointer.current.x
      const dy = event.clientY - lastPointer.current.y
      lastPointer.current = { x: event.clientX, y: event.clientY }
      velocity.current = { x: dx * 0.006, y: dy * 0.003 }
    }
    const handlePointerUp = (event: PointerEvent) => {
      dragging.current = false
      const { x: vx, y: vy } = velocity.current
      const speed = Math.hypot(vx, vy)
      if (speed > 0.00005) {
        autoAxis.current = { y: vx / speed, x: vy / speed }
      }
      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId)
      }
    }

    canvas.addEventListener('pointerdown', handlePointerDown)
    canvas.addEventListener('pointermove', handlePointerMove)
    canvas.addEventListener('pointerup', handlePointerUp)
    canvas.addEventListener('pointerleave', handlePointerUp)

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown)
      canvas.removeEventListener('pointermove', handlePointerMove)
      canvas.removeEventListener('pointerup', handlePointerUp)
      canvas.removeEventListener('pointerleave', handlePointerUp)
    }
  }, [allowDrag, gl])

  useFrame((_, delta) => {
    const g = group.current
    if (!g) return

    const autoSpeed = (Math.PI * 2) / FULL_ROTATION_SECONDS

    if (dragging.current) {
      rotation.current.y += velocity.current.x
      rotation.current.x += velocity.current.y
    } else {
      velocity.current.x *= 0.9
      velocity.current.y *= 0.9
      const settling = Math.abs(velocity.current.x) > 0.0002 || Math.abs(velocity.current.y) > 0.0002
      if (settling) {
        rotation.current.y += velocity.current.x
        rotation.current.x += velocity.current.y
      } else if (autoRotate) {
        rotation.current.y += autoAxis.current.y * autoSpeed * delta
        rotation.current.x += autoAxis.current.x * autoSpeed * delta
      }
    }

    g.rotation.y = rotation.current.y
    g.rotation.x = rotation.current.x
  })

  return <primitive ref={group} object={scene} />
}

useGLTF.preload(MOON_MODEL_URL)
