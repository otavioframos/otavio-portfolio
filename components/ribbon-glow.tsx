'use client';

// Ribbon Glow, adapted from Originkit for this site: fills its parent, pauses
// offscreen and in hidden tabs, holds a still frame for reduced motion, and
// falls back to the plain background when WebGL2 is unavailable.

import { useEffect, useRef } from 'react';

const MAX_DPR = 2;
const LAYERS = 84;
const TWIST = 1.25;
const DRAG = 0.18;
const PROGRAM_METHOD = ['use', 'Program'].join('') as 'useProgram';

const VERT_SRC = `#version 300 es
const vec2 P[3] = vec2[3](vec2(-1.0, -1.0), vec2(3.0, -1.0), vec2(-1.0, 3.0));
void main() { gl_Position = vec4(P[gl_VertexID], 0.0, 1.0); }
`;

const FIELD_SRC = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec3 uC1;
uniform vec3 uC2;
uniform float uSize;
uniform float uAngle;
uniform vec2 uMouse;
uniform float uOn;
uniform float uReach;
uniform vec2 uVel;
out vec4 o;

const float LAYERS = ${LAYERS.toFixed(1)};
const float TWIST = ${TWIST.toFixed(3)};
const float DRAG = ${DRAG.toFixed(3)};
const float GAIN = 0.62;
const vec2 CENTRE = vec2(-0.62, 0.24);
const float TILT = 0.6;
const float ZOOM = 1.05;
const float THETA = 2.13;
const float SHEAR = 0.963;
const float SHRINK = 0.953;
const vec2 WARP_FREQ = vec2(0.42, 2.4);
const vec2 WARP_AMP = vec2(0.13, 0.027);
const vec2 ASPECT = vec2(2.1, 0.17);
const float OFFSET = 0.36;
const float GLOW = 0.0021;
const float SOFT = 0.0019;
const float FALLOFF = 0.37;
const float PHASE = 12.0;
const float CYCLE = 0.16;
const float HUE_TRAVEL = 2.0;

mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, s, -s, c); }

void main() {
  vec2 R = uRes;
  vec2 pos = (gl_FragCoord.xy - 0.5 * R) / R.y;

  vec2 d = pos - uMouse;
  float w = uOn * exp(-dot(d, d) / (uReach * uReach));
  if (w > 1e-4) pos = uMouse + rot(w * TWIST) * d * (1.0 - 0.3 * min(w, 1.0)) - uVel * min(w, 1.0) * DRAG;

  pos = rot(uAngle) * pos / uSize;
  float t = uTime * 0.49 + PHASE;
  float breath = (-sin(uTime * 0.735) + sin(uTime * 0.49 + 1.0)) * 0.25 + 0.5;
  vec2 u = rot(TILT) * ((pos - CENTRE) * (ZOOM - breath * 0.085));
  mat2 fold = mat2(cos(THETA), sin(THETA), -SHEAR, cos(THETA));

  vec3 col = vec3(0.0);
  for (float i = 1.0; i <= LAYERS; i += 1.0) {
    u.x -= sin(u.y * WARP_FREQ.x + t + i * 0.007) * WARP_AMP.x;
    u.y -= sin(u.x * WARP_FREQ.y - t + i * 0.02) * WARP_AMP.y;
    u = fold * u * SHRINK;
    vec2 q = (u - vec2(OFFSET + breath * 0.1, 0.0)) * ASPECT;
    float g = GLOW / (dot(q, q) + SOFT) * (0.25 + breath * 0.4);
    float r = length(u);
    float k = sin(i * CYCLE + t * 1.2 + r * HUE_TRAVEL) * 0.5 + 0.5;
    col += g * mix(uC1, uC2, k) * (0.62 + 0.5 * k) * exp2(-r * FALLOFF);
  }
  vec3 x = max(col * GAIN, 0.0);
  col = (x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14);
  col = pow(clamp(col, 0.0, 1.0), vec3(0.85, 0.92, 0.98));
  col *= 1.0 - smoothstep(0.5, 1.6, length(pos)) * 0.07;
  o = vec4(col, 1.0);
}
`;

const FINISH_SRC = `#version 300 es
precision highp float;
uniform sampler2D uField;
uniform vec2 uRes;
uniform float uTime;
uniform vec3 uBg;
uniform float uPaper;
out vec4 o;

float ign(vec2 p, float f) { p += 5.588238 * mod(f, 64.0); return fract(52.9829189 * fract(0.06711056 * p.x + 0.00583715 * p.y)); }

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec3 L = max(texture(uField, frag / uRes).rgb, 0.0);
  vec3 dark = uBg + L * (1.0 - uBg);
  float strength = clamp(max(L.r, max(L.g, L.b)), 0.0, 1.0);
  vec3 paper = uBg * (1.0 - strength) + L * 0.96;
  vec3 col = mix(dark, paper, uPaper);
  col += (ign(frag, floor(uTime * 24.0)) - 0.5) / 255.0;
  o = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

type RGB = [number, number, number];

function hex(input: string): RGB {
  let h = input.trim().replace('#', '');
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  const n = parseInt(h.slice(0, 6), 16);
  if (!Number.isFinite(n)) return [0, 0, 0];
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

const clampN = (v: number, lo: number, hi: number) => (v < lo ? lo : v > hi ? hi : v);

function link(gl: WebGL2RenderingContext, frag: string): WebGLProgram | null {
  const shader = (type: number, src: string) => {
    const sh = gl.createShader(type);
    if (!sh) return null;
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      gl.deleteShader(sh);
      return null;
    }
    return sh;
  };
  const vs = shader(gl.VERTEX_SHADER, VERT_SRC);
  const fs = shader(gl.FRAGMENT_SHADER, frag);
  if (!vs || !fs) return null;
  const prog = gl.createProgram();
  if (!prog) return null;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    gl.deleteProgram(prog);
    return null;
  }
  return prog;
}

function uniforms(gl: WebGL2RenderingContext, prog: WebGLProgram, names: string[]) {
  const out: Record<string, WebGLUniformLocation | null> = {};
  for (const n of names) out[n] = gl.getUniformLocation(prog, n);
  return out;
}

function fieldTarget(gl: WebGL2RenderingContext) {
  const fbo = gl.createFramebuffer();
  let tex: WebGLTexture | null = null;
  let w = 0;
  let h = 0;
  let half = !!gl.getExtension('EXT_color_buffer_float');
  return {
    fbo,
    texture: () => tex,
    width: () => w,
    height: () => h,
    resize(nw: number, nh: number) {
      if (nw === w && nh === h && tex) return;
      for (let attempt = 0; attempt < 2; attempt++) {
        if (tex) gl.deleteTexture(tex);
        tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, half ? gl.RGBA16F : gl.RGBA8, nw, nh, 0, gl.RGBA, half ? gl.HALF_FLOAT : gl.UNSIGNED_BYTE, null);
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
        const ok = gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        if (ok || !half) break;
        half = false;
      }
      w = nw;
      h = nh;
    },
    dispose() {
      if (tex) gl.deleteTexture(tex);
      gl.deleteFramebuffer(fbo);
    },
  };
}

export type RibbonGlowProps = {
  className?: string;
  background?: string;
  color1?: string;
  color2?: string;
  /** 0–100, 50 is the original pace. */
  speed?: number;
  /** 50–200, percentage of the original scale. */
  size?: number;
  /** Degrees, −180 to 180. */
  angle?: number;
  /** 0–200, strength of the pointer twist. */
  hover?: number;
  /** Pointer radius in CSS pixels. */
  reach?: number;
};

export function RibbonGlow({
  className,
  background = '#050A1C',
  color1 = '#1F5BFF',
  color2 = '#8FB8FF',
  speed = 40,
  size = 110,
  angle = -180,
  hover = 90,
  reach = 260,
}: RibbonGlowProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const settings = useRef({ background, color1, color2, speed, size, angle, hover, reach });
  useEffect(() => {
    settings.current = { background, color1, color2, speed, size, angle, hover, reach };
  });

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;
    const gl = canvas.getContext('webgl2', { antialias: false, alpha: false, depth: false, stencil: false });
    if (!gl) return;
    const field = link(gl, FIELD_SRC);
    const finish = link(gl, FINISH_SRC);
    if (!field || !finish) return;
    const uf = uniforms(gl, field, ['uRes', 'uTime', 'uC1', 'uC2', 'uSize', 'uAngle', 'uMouse', 'uOn', 'uReach', 'uVel']);
    const un = uniforms(gl, finish, ['uField', 'uRes', 'uTime', 'uBg', 'uPaper']);
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const target = fieldTarget(gl);
    // Indirect access keeps the React compiler from reading gl.useProgram as a hook.
    const activate = (prog: WebGLProgram) => gl[PROGRAM_METHOD](prog);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    const ptr = { tx: 0, ty: 0, inside: false };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const r = root.getBoundingClientRect();
      ptr.tx = e.clientX - r.left;
      ptr.ty = e.clientY - r.top;
      ptr.inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    };
    const onLeave = () => { ptr.inside = false; };
    window.addEventListener('pointermove', onMove, { passive: true });
    root.addEventListener('pointerleave', onLeave);

    let mx = 0, my = 0, vx = 0, vy = 0, on = 0, raf = 0, last = -1, clock = 0;
    let visible = true;

    const draw = (dt: number) => {
      const v = settings.current;
      const speedK = clampN(v.speed, 0, 100) / 50;
      clock = (clock + dt * speedK) % 3600;
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const cw = canvas.clientWidth || 1;
      const ch = canvas.clientHeight || 1;
      const bw = Math.max(1, Math.round(cw * dpr));
      const bh = Math.max(1, Math.round(ch * dpr));
      if (canvas.width !== bw || canvas.height !== bh) { canvas.width = bw; canvas.height = bh; }
      target.resize(Math.max(1, Math.round(bw / 2)), Math.max(1, Math.round(bh / 2)));

      const present = ptr.inside ? 1 : 0;
      if (present && on < 0.02) { mx = ptr.tx; my = ptr.ty; }
      on += (present - on) * (1 - Math.exp(-dt * 5));
      const k = 1 - Math.exp(-dt * 16);
      const nx = mx + (ptr.tx - mx) * k;
      const ny = my + (ptr.ty - my) * k;
      if (dt > 0) {
        const kv = 1 - Math.exp(-dt * 8);
        vx += ((nx - mx) / dt - vx) * kv;
        vy += ((ny - my) / dt - vy) * kv;
      }
      mx = nx; my = ny;
      const vLen = Math.hypot(vx, vy) / ch;
      const vCap = vLen > 3 ? 3 / vLen : 1;

      const c1 = hex(v.color1), c2 = hex(v.color2), bg = hex(v.background);
      const bgLum = 0.2126 * bg[0] + 0.7152 * bg[1] + 0.0722 * bg[2];

      gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
      gl.viewport(0, 0, target.width(), target.height());
      activate(field);
      gl.uniform2f(uf.uRes, target.width(), target.height());
      gl.uniform1f(uf.uTime, clock);
      gl.uniform3f(uf.uC1, c1[0], c1[1], c1[2]);
      gl.uniform3f(uf.uC2, c2[0], c2[1], c2[2]);
      gl.uniform1f(uf.uSize, clampN(v.size, 50, 200) / 100);
      gl.uniform1f(uf.uAngle, (clampN(v.angle, -180, 180) * Math.PI) / 180);
      gl.uniform2f(uf.uMouse, (mx - cw / 2) / ch, (ch / 2 - my) / ch);
      gl.uniform1f(uf.uOn, on * (clampN(v.hover, 0, 200) / 100));
      gl.uniform1f(uf.uReach, clampN(v.reach, 10, 800) / ch);
      gl.uniform2f(uf.uVel, (vx / ch) * vCap, (-vy / ch) * vCap);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, bw, bh);
      activate(finish);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, target.texture());
      gl.uniform1i(un.uField, 0);
      gl.uniform2f(un.uRes, bw, bh);
      gl.uniform1f(un.uTime, clock);
      gl.uniform3f(un.uBg, bg[0], bg[1], bg[2]);
      gl.uniform1f(un.uPaper, clampN((bgLum - 0.35) / 0.3, 0, 1));
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      root.dataset.ready = 'true';
    };

    const loop = (now: number) => {
      raf = 0;
      const dt = last < 0 ? 0 : clampN((now - last) / 1000, 0, 0.05);
      last = now;
      draw(dt);
      schedule();
    };
    const running = () => visible && !document.hidden && !reduced.matches;
    function schedule() {
      if (running() && !raf) raf = requestAnimationFrame(loop);
    }
    const sync = () => {
      if (!running()) { if (raf) cancelAnimationFrame(raf); raf = 0; last = -1; draw(0); }
      else schedule();
    };

    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    io.observe(root);
    const ro = new ResizeObserver(() => { if (!running()) draw(0); });
    ro.observe(root);
    document.addEventListener('visibilitychange', sync);
    reduced.addEventListener('change', sync);
    sync();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', sync);
      reduced.removeEventListener('change', sync);
      window.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerleave', onLeave);
      target.dispose();
      gl.deleteVertexArray(vao);
      gl.deleteProgram(field);
      gl.deleteProgram(finish);
    };
  }, []);

  return <div ref={rootRef} className={className} style={{ background }} aria-hidden="true">
    <canvas ref={canvasRef} />
  </div>;
}
