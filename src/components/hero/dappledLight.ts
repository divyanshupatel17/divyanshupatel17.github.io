/*
  Dappled light.

  Paints a slowly swaying tree shadow across the top of the hero. The canopy is
  generated procedurally in the fragment shader (layered value noise carved into
  clumps) rather than sampled from a photograph, so there is no texture to load
  and the silhouette never repeats exactly.

  Raw WebGL on a single full screen triangle. No dependencies; if the context is
  unavailable the canvas simply stays transparent and the hero shows through.
*/

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`

const FRAG = `
precision highp float;

varying vec2 v_uv;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec3 u_shadowTint;
uniform vec3 u_lightColor;
uniform vec2 u_lightPos;
uniform vec2 u_lightDir;
uniform float u_isDark;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

// Value noise with smoothstep interpolation.
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float total = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 5; i++) {
    total += noise(p) * amp;
    p *= 2.02;
    amp *= 0.5;
  }
  return total;
}

mat2 rot(float a) {
  float s = sin(a);
  float c = cos(a);
  return mat2(c, -s, s, c);
}

/*
  Canopy mask. Two noise fields at different scales are multiplied so the result
  breaks into leaf sized clumps with gaps between them, then a soft radial
  falloff from the top edge keeps the foliage hanging from above rather than
  filling the frame.
*/
float canopy(vec2 uv) {
  vec2 p = uv * vec2(8.5, 6.4);

  // Warp the sampling domain so clumps curl around each other instead of
  // reading as an even field of noise.
  vec2 warp = vec2(fbm(p * 0.9), fbm(p * 0.9 + vec2(5.2, 1.3))) - 0.5;
  p += warp * 1.35;

  float coarse = fbm(p * 1.15 + vec2(0.0, 0.3));
  float fine = fbm(p * 4.3 - vec2(1.7, 0.4));
  float twigs = fbm(p * 11.0 + vec2(4.2, 2.1));

  float mass = coarse * 0.58 + fine * 0.30 + twigs * 0.12;

  // Tight thresholds carve the mass into discrete, hard edged leaf clumps.
  float leaves = smoothstep(0.475, 0.545, mass);

  // Punch gaps of sky through the crown so light gets between the leaves.
  float gaps = smoothstep(0.42, 0.49, fbm(p * 1.9 + vec2(9.3, 1.4)));
  leaves *= mix(0.12, 1.0, gaps);

  // A few bare branches threading through the foliage.
  float branch = 1.0 - smoothstep(0.012, 0.05, abs(fbm(p * 1.5 + vec2(2.4, 7.1)) - 0.5));
  leaves = max(leaves, branch * 0.55);

  // Hang the crown from the top edge and let it thin out downwards.
  float hang = smoothstep(1.25, -0.15, uv.y);
  // Thin it to the left so the cast reads as coming from off frame right.
  float spread = smoothstep(-0.45, 0.85, uv.x);

  return clamp(leaves * hang * spread, 0.0, 1.0);
}

// Cheap separable-ish blur: a few taps at increasing radius.
float softCanopy(vec2 uv) {
  vec2 r1 = vec2(9.0) / u_resolution;
  vec2 r2 = vec2(22.0) / u_resolution;

  float sum = canopy(uv) * 0.30;
  sum += canopy(uv + vec2(r1.x, 0.0)) * 0.11;
  sum += canopy(uv - vec2(r1.x, 0.0)) * 0.11;
  sum += canopy(uv + vec2(0.0, r1.y)) * 0.11;
  sum += canopy(uv - vec2(0.0, r1.y)) * 0.11;
  sum += canopy(uv + r2) * 0.065;
  sum += canopy(uv - r2) * 0.065;
  sum += canopy(uv + vec2(r2.x, -r2.y)) * 0.065;
  sum += canopy(uv + vec2(-r2.x, r2.y)) * 0.065;
  return sum;
}

void main() {
  float t = u_time * 0.82;

  // Wind: a slow drift plus a faster wobble, with a little rotation about the
  // canopy anchor so the whole crown breathes instead of sliding flat.
  vec2 anchor = vec2(0.62, 0.18);
  vec2 sway = vec2(
    sin(t * 0.42) * 0.020 + sin(t * 0.97) * 0.008,
    cos(t * 0.61) * 0.007
  );
  float twist = sin(t * 0.35) * 0.05;

  vec2 uv = v_uv;
  vec2 local = uv - anchor;
  local = rot(twist) * local;
  uv = local + anchor + sway;

  float core = canopy(uv);
  float blur = softCanopy(uv);
  float shadow = mix(core, blur, 0.42);

  // Pool the shadow towards the bottom of the strip.
  shadow *= smoothstep(1.25, 0.1, v_uv.y) * 0.9;

  // High frequency shimmer keeps the edges alive.
  shadow *= 0.97 + 0.03 * sin(t * 2.2 + v_uv.x * 7.0 + v_uv.y * 4.0);

  // Grain so the edges do not read as digital.
  float grain = (hash(gl_FragCoord.xy * 0.9 + u_time * 31.0) - 0.5) * 0.025;
  float alpha = clamp(shadow + grain * shadow, 0.0, 1.0);

  // Feather every edge so nothing hard cuts at the canvas wall.
  float edge =
    smoothstep(0.0, 0.14, v_uv.x) * smoothstep(1.0, 0.86, v_uv.x) *
    smoothstep(0.0, 0.10, v_uv.y) * smoothstep(1.0, 0.88, v_uv.y);
  alpha *= edge;

  /*
    Night mode adds a moon behind the canopy: a wide diffuse glow plus a cone of
    rays along u_lightDir, occluded by the leaves. Computed unconditionally and
    masked, because branching on a uniform miscompiles on some mobile drivers.
  */
  float darkMask = step(0.5, u_isDark);

  vec2 toPixel = v_uv - u_lightPos;
  float dist = length(toPixel);
  vec2 toPixelN = toPixel / max(dist, 1e-4);
  float alignment = max(dot(toPixelN, normalize(u_lightDir)), 0.0);

  float glow = exp(-dist * 1.15);
  float ray = pow(alignment, 2.6) * exp(-dist * 0.26);
  ray *= 0.93 + 0.07 * hash(v_uv * 460.0 + vec2(u_time * 0.6));

  float breath = 0.93 + 0.07 * sin(t * 0.4);
  float lightField = clamp((glow * 0.20 + ray * 0.46) * breath, 0.0, 1.0);
  lightField *= (1.0 - shadow * 0.94);
  lightField *= edge * darkMask;

  vec3 rgb = mix(u_shadowTint, u_lightColor, lightField);
  float outAlpha = max(alpha, lightField * 0.9);

  // Premultiplied, to pair with a premultiplied canvas context.
  gl_FragColor = vec4(rgb * outAlpha, outAlpha);
}
`

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

const LIGHT_TINT = [0.251, 0.243, 0.224] as const
const DARK_TINT = [0.02, 0.016, 0.03] as const
const MOON_COLOR = [0.96, 0.94, 0.86] as const

export type DappledHandle = {
  setDark: (dark: boolean) => void
  destroy: () => void
}

export function mountDappledLight(canvas: HTMLCanvasElement): DappledHandle | null {
  const gl = (canvas.getContext('webgl', {
    alpha: true,
    premultipliedAlpha: true,
    antialias: true,
    depth: false,
    stencil: false,
  }) || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null

  if (!gl) return null

  const vs = compile(gl, gl.VERTEX_SHADER, VERT)
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
  if (!vs || !fs) return null

  const program = gl.createProgram()
  if (!program) return null
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null

  gl.useProgram(program)

  // One oversized triangle covers the clip space square with no seam.
  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const aPos = gl.getAttribLocation(program, 'a_pos')
  gl.enableVertexAttribArray(aPos)
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

  const u = {
    time: gl.getUniformLocation(program, 'u_time'),
    resolution: gl.getUniformLocation(program, 'u_resolution'),
    shadowTint: gl.getUniformLocation(program, 'u_shadowTint'),
    lightColor: gl.getUniformLocation(program, 'u_lightColor'),
    lightPos: gl.getUniformLocation(program, 'u_lightPos'),
    lightDir: gl.getUniformLocation(program, 'u_lightDir'),
    isDark: gl.getUniformLocation(program, 'u_isDark'),
  }

  gl.enable(gl.BLEND)
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
  gl.clearColor(0, 0, 0, 0)

  gl.uniform3fv(u.lightColor, MOON_COLOR as unknown as number[])
  gl.uniform2f(u.lightPos, 0.78, 0.16)
  gl.uniform2f(u.lightDir, -0.35, 0.94)

  let dark = false
  let raf = 0
  let running = true
  const start = performance.now()

  const reduced =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = Math.max(1, Math.round(canvas.clientWidth * dpr))
    const h = Math.max(1, Math.round(canvas.clientHeight * dpr))
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w
      canvas.height = h
      gl.viewport(0, 0, w, h)
    }
    gl.uniform2f(u.resolution, canvas.width, canvas.height)
  }

  const draw = (now: number) => {
    if (!running) return
    resize()
    // Frozen at a pleasant frame when the visitor asked for less motion.
    const t = reduced ? 6.5 : (now - start) / 1000
    gl.uniform1f(u.time, t)
    const tint = dark ? DARK_TINT : LIGHT_TINT
    gl.uniform3fv(u.shadowTint, tint as unknown as number[])
    gl.uniform1f(u.isDark, dark ? 1 : 0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
    if (!reduced) raf = requestAnimationFrame(draw)
  }

  raf = requestAnimationFrame(draw)

  // Stop burning frames while the tab is hidden.
  const onVisibility = () => {
    if (document.hidden) {
      running = false
      cancelAnimationFrame(raf)
    } else if (!running) {
      running = true
      raf = requestAnimationFrame(draw)
    }
  }
  document.addEventListener('visibilitychange', onVisibility)

  return {
    setDark(next: boolean) {
      dark = next
      if (reduced) requestAnimationFrame(draw)
    },
    destroy() {
      running = false
      cancelAnimationFrame(raf)
      document.removeEventListener('visibilitychange', onVisibility)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
    },
  }
}
