export function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(
      window.WebGLRenderingContext && (canvas.getContext('webgl2') || canvas.getContext('webgl')),
    )
  } catch {
    return false
  }
}

export function isCoarsePointer() {
  return typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
}
