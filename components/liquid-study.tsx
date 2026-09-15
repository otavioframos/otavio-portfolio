'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const vertexSource = `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

// Smoothly joined spheres form a fluid-like surface; this is a motion study,
// not a physical fluid solver. Shading and geometry stay entirely on the GPU.
const fragmentSource = `
precision mediump float;
uniform vec2 resolution;
uniform vec2 pointer;
uniform vec2 trailing;
uniform float phase;

float join(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}
float surface(vec3 p) {
  float angle = -0.38 + 0.12 * sin(phase * 0.3);
  p.xy = mat2(cos(angle), -sin(angle), sin(angle), cos(angle)) * p.xy;
  p.xy -= pointer * 0.17;
  float d = length(p * vec3(1.0, 1.14, 1.0)) - 0.56;
  vec2 pull = (pointer - trailing) * 0.45;
  d = join(d, length(p - vec3(0.35 + pull.x, 0.38 + pull.y, 0.04)) - 0.39, 0.36);
  d = join(d, length(p - vec3(-0.35, -0.35 + 0.08 * sin(phase * 0.8), 0.13)) - 0.37, 0.32);
  d = join(d, length(p - vec3(-0.38 + 0.08 * cos(phase * 0.5), 0.29, -0.02)) - 0.28, 0.25);
  d += 0.014 * sin(p.x * 7.0 + phase) * sin(p.y * 6.0 - phase * 0.7);
  return d;
}
void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  vec3 origin = vec3(0.0, 0.0, 3.2);
  vec3 ray = normalize(vec3(uv, -2.6));
  float travel = 0.0;
  float distanceToSurface = 0.0;
  for (int i = 0; i < 48; i++) {
    distanceToSurface = surface(origin + ray * travel);
    if (distanceToSurface < 0.002 || travel > 5.0) break;
    travel += distanceToSurface * 0.75;
  }
  if (distanceToSurface > 0.008 || travel > 5.0) {
    gl_FragColor = vec4(0.0);
    return;
  }
  vec3 p = origin + ray * travel;
  vec2 e = vec2(0.003, 0.0);
  vec3 n = normalize(vec3(
    surface(p + e.xyy) - surface(p - e.xyy),
    surface(p + e.yxy) - surface(p - e.yxy),
    surface(p + e.yyx) - surface(p - e.yyx)
  ));
  vec3 light = normalize(vec3(-0.6, 0.85, 1.3));
  vec3 view = -ray;
  float diffuse = max(dot(n, light), 0.0);
  float fresnel = pow(1.0 - max(dot(n, view), 0.0), 2.5);
  float specular = pow(max(dot(n, normalize(light + view)), 0.0), 55.0);
  vec3 reflection = reflect(ray, n);
  float softbox = smoothstep(0.86, 0.97, dot(reflection, normalize(vec3(-0.6, 0.85, 1.0))));
  float ribbon = exp(-pow((reflection.y + reflection.x * 0.3 - 0.4) * 12.0, 2.0));
  vec3 copper = vec3(0.9, 0.23, 0.075) * (0.24 + diffuse * 0.82);
  vec3 color = copper + vec3(1.0, 0.78, 0.53) * (softbox * 0.65 + specular * 0.5);
  color += vec3(1.0, 0.41, 0.17) * fresnel * 0.65;
  color += vec3(1.0, 0.74, 0.47) * ribbon * 0.17;
  color = pow(color, vec3(0.87));
  gl_FragColor = vec4(color, 1.0);
}
`;

export function LiquidStudy({ lang }: { lang: 'en' | 'pt' }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(false);
  const syncRef = useRef<(() => void) | null>(null);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const pt = lang === 'pt';

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    const gl = canvas.getContext('webgl', { alpha: true, antialias: false, powerPreference: 'low-power' });
    if (!gl) return;
    const shaders: WebGLShader[] = [];
    const makeShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      shaders.push(shader);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
    };
    const vertex = makeShader(gl.VERTEX_SHADER, vertexSource);
    const fragment = makeShader(gl.FRAGMENT_SHADER, fragmentSource);
    const program = gl.createProgram();
    if (!vertex || !fragment || !program) {
      shaders.forEach(s => gl.deleteShader(s));
      if (program) gl.deleteProgram(program);
      return;
    }
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      shaders.forEach(s => gl.deleteShader(s));
      gl.deleteProgram(program);
      return;
    }
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    // oxlint-disable-next-line react/react-compiler -- WebGL's useProgram is not a React hook.
    gl.useProgram(program);
    const position = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const uniforms = {
      resolution: gl.getUniformLocation(program, 'resolution'),
      pointer: gl.getUniformLocation(program, 'pointer'),
      trailing: gl.getUniformLocation(program, 'trailing'),
      phase: gl.getUniformLocation(program, 'phase'),
    };
    const motion = { x: 0, y: 0, tailX: 0, tailY: 0 };
    const xTo = gsap.quickTo(motion, 'x', { duration: 0.65, ease: 'power3.out' });
    const yTo = gsap.quickTo(motion, 'y', { duration: 0.65, ease: 'power3.out' });
    const tailXTo = gsap.quickTo(motion, 'tailX', { duration: 1.2, ease: 'power2.out' });
    const tailYTo = gsap.quickTo(motion, 'tailY', { duration: 1.2, ease: 'power2.out' });
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    let running = false;
    let lost = false;
    let phase = 1.6;
    let elapsed = 0;

    const draw = () => {
      if (lost) return;
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
      gl.uniform2f(uniforms.pointer, motion.x, motion.y);
      gl.uniform2f(uniforms.trailing, motion.tailX, motion.tailY);
      gl.uniform1f(uniforms.phase, phase);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };
    const tick = (_time: number, delta: number) => {
      elapsed += delta;
      // Cap only this decorative renderer, without changing GSAP globally.
      if (elapsed < 1000 / 30) return;
      phase += Math.min(elapsed, 80) / 1000;
      elapsed = 0;
      draw();
    };
    const sync = () => {
      const active = visible && !document.hidden && !media.matches && !pausedRef.current && !lost;
      if (active && !running) gsap.ticker.add(tick);
      if (!active && running) gsap.ticker.remove(tick);
      running = active;
      if (!active) [xTo, yTo, tailXTo, tailYTo].forEach(tween => tween.tween.pause());
    };
    syncRef.current = sync;
    const resize = () => {
      const bounds = host.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.25, 640 / Math.max(bounds.width, bounds.height, 1));
      canvas.width = Math.max(1, Math.round(bounds.width * ratio));
      canvas.height = Math.max(1, Math.round(bounds.height * ratio));
      gl.viewport(0, 0, canvas.width, canvas.height);
      draw();
    };
    const move = (event: PointerEvent) => {
      if (!running || event.pointerType === 'touch') return;
      const bounds = host.getBoundingClientRect();
      const x = gsap.utils.clamp(-1, 1, (event.clientX - bounds.left) / bounds.width * 2 - 1);
      const y = gsap.utils.clamp(-1, 1, 1 - (event.clientY - bounds.top) / bounds.height * 2);
      xTo(x); yTo(y); tailXTo(x); tailYTo(y);
    };
    const leave = () => { if (running) { xTo(0); yTo(0); tailXTo(0); tailYTo(0); } };
    const preference = () => { setReduced(media.matches); sync(); draw(); };
    const contextLost = (event: Event) => { event.preventDefault(); lost = true; setReady(false); sync(); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    const sizeObserver = new ResizeObserver(resize);
    observer.observe(host);
    sizeObserver.observe(host);
    const hero = host.closest('.hero') || host;
    hero.addEventListener('pointermove', move as EventListener, { passive: true });
    hero.addEventListener('pointerleave', leave);
    document.addEventListener('visibilitychange', sync);
    media.addEventListener('change', preference);
    canvas.addEventListener('webglcontextlost', contextLost);
    preference();
    resize();
    setReady(true);
    return () => {
      syncRef.current = null;
      observer.disconnect(); sizeObserver.disconnect();
      gsap.ticker.remove(tick); gsap.killTweensOf(motion);
      hero.removeEventListener('pointermove', move as EventListener);
      hero.removeEventListener('pointerleave', leave);
      document.removeEventListener('visibilitychange', sync);
      media.removeEventListener('change', preference);
      canvas.removeEventListener('webglcontextlost', contextLost);
      gl.deleteBuffer(buffer); gl.deleteProgram(program);
      shaders.forEach(s => gl.deleteShader(s));
    };
  }, []);

  return <figure className="liquid-study">
    <div className="study-topline"><span>CREATIVE CODING / 001</span><span aria-hidden="true">↙</span></div>
    <div ref={hostRef} className="liquid-stage" data-ready={ready}>
      <div className="liquid-guides" aria-hidden="true" />
      <div className="liquid-fallback" aria-hidden="true" />
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
    <figcaption className="study-caption">
      <div><span>{pt ? 'Ideias em movimento.' : 'Ideas in motion.'}</span><p className="study-pointer-hint">{pt ? 'Mova o cursor para explorar' : 'Move your cursor to explore'}</p></div>
      {ready && !reduced && <button type="button" aria-pressed={paused} aria-label={paused ? (pt ? 'Retomar animação' : 'Resume animation') : (pt ? 'Pausar animação' : 'Pause animation')} onClick={() => {
        pausedRef.current = !pausedRef.current;
        setPaused(pausedRef.current);
        syncRef.current?.();
      }}>{paused ? '▶' : 'Ⅱ'}</button>}
    </figcaption>
  </figure>;
}
