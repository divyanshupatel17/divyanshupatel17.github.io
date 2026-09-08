import { useEffect, useRef } from 'react'
import * as THREE from 'three'

import moonTexture from '../assets/moon.jpg'

/**
 * Sphere sits mostly below the frame; only its cresting top edge shows,
 * spanning the full container width like a horizon. Drag rotates it
 * freely on both axes; it auto-spins slowly when idle.
 */
export function InteractiveMoon() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()

    const frustumHalfHeight = 1
    const camera = new THREE.OrthographicCamera(-1, 1, frustumHalfHeight, -frustumHalfHeight, 0.1, 100)
    camera.position.set(0, 0, 10)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    const texture = new THREE.TextureLoader().load(moonTexture)
    texture.colorSpace = THREE.SRGBColorSpace

    const RADIUS = 16
    const APEX_Y = 0.42
    const geometry = new THREE.SphereGeometry(RADIUS, 96, 96)
    // Unlit on purpose: this is a stylized graphic, not a lit 3D object, so it
    // must read the same regardless of which side is rotated into view instead
    // of swinging into a directional light's shadow side as the user drags.
    const material = new THREE.MeshBasicMaterial({ map: texture })
    const moon = new THREE.Mesh(geometry, material)
    moon.position.set(0, APEX_Y - RADIUS, 0)
    scene.add(moon)

    // The equirectangular texture is squished at its poles, which sit on
    // the sphere's local +/-Y axis. Tilt 90deg so the detailed equator
    // band faces the camera at the apex instead of a featureless pole.
    const BASE_TILT = Math.PI / 2
    const X_DRAG_RANGE = 0.9
    const rotation = { x: BASE_TILT - 0.15, y: 0 }
    const velocity = { x: 0, y: 0.0009 }
    let dragging = false
    let lastX = 0
    let lastY = 0
    let idleSince = performance.now()

    const setSize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      const aspect = w / h
      camera.left = -aspect
      camera.right = aspect
      camera.top = frustumHalfHeight
      camera.bottom = -frustumHalfHeight
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    setSize()
    const resizeObserver = new ResizeObserver(setSize)
    resizeObserver.observe(mount)

    const onPointerDown = (e: PointerEvent) => {
      dragging = true
      lastX = e.clientX
      lastY = e.clientY
      mount.setPointerCapture(e.pointerId)
    }
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return
      const dx = e.clientX - lastX
      const dy = e.clientY - lastY
      lastX = e.clientX
      lastY = e.clientY
      const speed = 0.006
      velocity.y = dx * speed * 0.5
      velocity.x = dy * speed * 0.5
      rotation.y += dx * speed
      rotation.x += dy * speed
      idleSince = performance.now()
    }
    const onPointerUp = (e: PointerEvent) => {
      dragging = false
      try {
        mount.releasePointerCapture(e.pointerId)
      } catch {
        /* pointer already released */
      }
    }

    mount.addEventListener('pointerdown', onPointerDown)
    mount.addEventListener('pointermove', onPointerMove)
    mount.addEventListener('pointerup', onPointerUp)
    mount.addEventListener('pointerleave', onPointerUp)

    let frame = 0
    const animate = () => {
      frame = requestAnimationFrame(animate)

      if (!dragging) {
        const idleFor = performance.now() - idleSince
        velocity.x *= 0.94
        velocity.y *= 0.94
        if (idleFor > 900) {
          velocity.y += (0.0011 - velocity.y) * 0.02
        }
        rotation.x += velocity.x
        rotation.y += velocity.y
      }

      rotation.x = Math.max(BASE_TILT - X_DRAG_RANGE, Math.min(BASE_TILT + X_DRAG_RANGE, rotation.x))

      moon.rotation.y = rotation.y
      moon.rotation.x = rotation.x

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      mount.removeEventListener('pointerdown', onPointerDown)
      mount.removeEventListener('pointermove', onPointerMove)
      mount.removeEventListener('pointerup', onPointerUp)
      mount.removeEventListener('pointerleave', onPointerUp)
      mount.removeChild(renderer.domElement)
      geometry.dispose()
      material.dispose()
      texture.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      role="img"
      aria-label="Interactive rotating moon, drag to spin"
      className="absolute inset-0 cursor-grab touch-none active:cursor-grabbing [&>canvas]:block [&>canvas]:h-full [&>canvas]:w-full"
    />
  )
}
