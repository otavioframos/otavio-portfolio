import type { ReactNode } from 'react';

/**
 * Exploded isometric blueprints, one per working principle. Every scene shares
 * the same projection, plate thickness, line weight and label style, so the
 * row reads as one set of technical drawings.
 */

const COS = Math.cos(Math.PI / 6);
const SIN = 0.5;
const INK = '#8FB8FF';
const FAINT = 'rgba(143,184,255,.28)';
const FACE = '#0B1A40';
const SIDE = '#081330';
const T = 7; // plate thickness

type Pt = [number, number];
type Plate = {
  z: number;
  w: number;
  d: number;
  label: string;
  /** Shape: rectangular plate or disc of radius w/2. */
  round?: boolean;
  draw?: (at: (u: number, v: number, lift?: number) => Pt) => ReactNode;
};

const fmt = (p: Pt) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`;
const poly = (points: Pt[]) => points.map(fmt).join(' ');

function Scene({ id, figure, title, plates, cx = 200, cy = 300 }: { id: string; figure: string; title: string; plates: Plate[]; cx?: number; cy?: number }) {
  const project = (x: number, y: number, z: number): Pt => [cx + (x - y) * COS, cy + (x + y) * SIN - z];
  const ordered = [...plates].sort((a, b) => a.z - b.z);
  const labelX = 390;

  return <svg className="bp" viewBox="0 0 480 400" aria-hidden="true">
    <defs>
      <pattern id={`${id}-grid`} width="16" height="16" patternUnits="userSpaceOnUse"><path d="M16 0H0V16" fill="none" stroke={INK} strokeOpacity=".07" /></pattern>
    </defs>
    <rect width="480" height="400" fill={`url(#${id}-grid)`} />
    <text x="16" y="24" className="bp-meta">{figure}</text>
    <text x="464" y="24" className="bp-meta" textAnchor="end">{title.toUpperCase()}</text>
    <path d="M16 380h64M16 376v8M48 377v6M80 376v8" stroke={INK} strokeOpacity=".5" fill="none" />
    <text x="88" y="383" className="bp-meta">0 — 64</text>

    {ordered.map((plate, index) => {
      const { z, w, d } = plate;
      const at = (u: number, v: number, lift = 0) => project(u - w / 2, v - d / 2, z + lift);
      const below = ordered[index - 1];
      // Corner and label anchor points on this plate.
      const corners: Pt[] = plate.round
        ? [at(w / 2, 0), at(w, d / 2), at(w / 2, d), at(0, d / 2)]
        : [at(0, 0), at(w, 0), at(w, d), at(0, d)];
      const right = plate.round ? at(w / 2 + (w / 2) * Math.cos(-Math.PI / 4), d / 2 + (d / 2) * Math.sin(-Math.PI / 4)) : corners[1];

      let body: ReactNode;
      if (plate.round) {
        const ring = (lift: number) => Array.from({ length: 56 }, (_, i) => { const t = (i / 56) * Math.PI * 2; return at(w / 2 + (w / 2) * Math.cos(t), d / 2 + (d / 2) * Math.sin(t), lift); });
        body = <>
          <polygon points={poly(ring(-T))} fill={SIDE} stroke={INK} strokeWidth="1" />
          <polygon points={poly(ring(0))} fill={FACE} stroke={INK} strokeWidth="1.2" />
        </>;
      } else {
        const [a, b, c, dd] = corners;
        const drop = (p: Pt): Pt => [p[0], p[1] + T];
        body = <>
          <polygon points={poly([b, c, drop(c), drop(b)])} fill={SIDE} stroke={INK} strokeWidth="1" />
          <polygon points={poly([c, dd, drop(dd), drop(c)])} fill={SIDE} stroke={INK} strokeWidth="1" />
          <polygon points={poly([a, b, c, dd])} fill={FACE} stroke={INK} strokeWidth="1.2" />
        </>;
      }

      // Explosion axes: corner verticals between stacked plates, or the centre axis for discs.
      const gap = below ? z - below.z - T : 0;
      const starts: Pt[] = !below ? [] : plate.round ? [at(w / 2, d / 2)] : [corners[0], corners[1], corners[3]];
      const connectors = starts.map((p, i) => <line key={i} className="bp-dash" x1={p[0]} y1={p[1] + (plate.round ? 0 : T)} x2={p[0]} y2={p[1] + gap + (plate.round ? T : T)} stroke={INK} strokeOpacity=".55" strokeDasharray="3 4" />);

      return <g key={plate.label}>
        {connectors}
        {body}
        {plate.draw?.(at)}
        <path d={`M${right[0].toFixed(1)} ${right[1].toFixed(1)}H${labelX - 6}`} stroke={FAINT} fill="none" />
        <circle cx={right[0]} cy={right[1]} r="2" fill={INK} />
        <text x={labelX} y={right[1] + 3.5} className="bp-label">{String(ordered.length - index).padStart(2, '0')} {plate.label}</text>
      </g>;
    })}
  </svg>;
}

/** Iso rectangle on a plate, given plate-space corners. */
const rect = (at: (u: number, v: number, l?: number) => Pt, u: number, v: number, w: number, d: number, props: Record<string, unknown> = {}) =>
  <polygon points={poly([at(u, v), at(u + w, v), at(u + w, v + d), at(u, v + d)])} fill="none" stroke={INK} strokeWidth="1" {...props} />;
const line = (at: (u: number, v: number, l?: number) => Pt, u1: number, v1: number, u2: number, v2: number, props: Record<string, unknown> = {}) => {
  const [a, b] = [at(u1, v1), at(u2, v2)];
  return <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={INK} strokeWidth="1" {...props} />;
};
const circle = (at: (u: number, v: number, l?: number) => Pt, u: number, v: number, r: number, props: Record<string, unknown> = {}) =>
  <polygon points={poly(Array.from({ length: 28 }, (_, i) => { const a = (i / 28) * Math.PI * 2; return at(u + r * Math.cos(a), v + r * Math.sin(a)); }))} fill="none" stroke={INK} strokeWidth="1" {...props} />;

/** 01 · Ownership: brand, product and system as one stack. */
export function OwnershipBlueprint({ title }: { title: string }) {
  return <Scene id="bp-own" figure="FIG. 01" title={title} plates={[
    { z: 172, w: 190, d: 190, label: 'BRAND', draw: at => <>{circle(at, 95, 95, 52)}{circle(at, 95, 95, 34, { strokeOpacity: .5 })}<polyline points={poly([at(100, 62), at(80, 98), at(100, 96), at(88, 128), at(114, 88), at(96, 90), at(108, 62)])} fill="none" stroke={INK} strokeWidth="1.3" /></> },
    { z: 96, w: 190, d: 190, label: 'PRODUCT', draw: at => <>{rect(at, 40, 22, 110, 146)}{rect(at, 54, 38, 82, 18, { strokeOpacity: .6 })}{rect(at, 54, 66, 82, 40, { strokeOpacity: .6 })}{rect(at, 54, 116, 82, 16, { fill: 'rgba(143,184,255,.25)' })}{line(at, 54, 144, 110, 144, { strokeOpacity: .5 })}</> },
    { z: 20, w: 190, d: 190, label: 'SYSTEM', draw: at => <>{Array.from({ length: 16 }, (_, i) => rect(at, 28 + (i % 4) * 36, 28 + Math.floor(i / 4) * 36, 26, 26, { key: i, fill: [0, 5, 10, 15, 6].includes(i) ? 'rgba(143,184,255,.28)' : 'none', strokeOpacity: .75 }))}</> },
  ]} />;
}

/** 02 · Collaboration: one component exploded into copy, container and spec, with redlines. */
export function CollaborationBlueprint({ title }: { title: string }) {
  return <Scene id="bp-col" figure="FIG. 02" title={title} cx={184} plates={[
    { z: 172, w: 200, d: 120, label: 'COPY', draw: at => <>{line(at, 40, 60, 160, 60, { strokeWidth: 3, strokeLinecap: 'round' })}{line(at, 60, 76, 140, 76, { strokeOpacity: .5, strokeWidth: 2, strokeLinecap: 'round' })}</> },
    { z: 96, w: 200, d: 120, label: 'COMPONENT', draw: at => <>{rect(at, 24, 32, 152, 56, { fill: 'rgba(143,184,255,.18)' })}{rect(at, 136, 48, 24, 24, { strokeOpacity: .7 })}</> },
    { z: 20, w: 200, d: 120, label: 'SPEC', draw: at => <>
      {rect(at, 24, 32, 152, 56, { strokeDasharray: '4 3', strokeOpacity: .7 })}
      {line(at, 24, 104, 176, 104)}{line(at, 24, 98, 24, 110)}{line(at, 176, 98, 176, 110)}
      {line(at, 188, 32, 188, 88)}{line(at, 182, 32, 194, 32)}{line(at, 182, 88, 194, 88)}
      {line(at, 24, 60, 40, 60, { strokeOpacity: .6 })}{line(at, 160, 60, 176, 60, { strokeOpacity: .6 })}
      <text x={at(100, 116)[0]} y={at(100, 116)[1] + 12} className="bp-note" textAnchor="middle">&lt;Button /&gt;</text>
    </> },
  ]} />;
}

/** 03 · Building: a phone exploded from glass to shell. */
export function BuildingBlueprint({ title }: { title: string }) {
  return <Scene id="bp-bld" figure="FIG. 03" title={title} cy={318} cx={190} plates={[
    { z: 190, w: 120, d: 230, label: 'GLASS', draw: at => <>{line(at, 18, 30, 60, 130, { strokeOpacity: .45 })}{line(at, 30, 30, 72, 130, { strokeOpacity: .25 })}</> },
    { z: 134, w: 120, d: 230, label: 'INTERFACE', draw: at => <>{rect(at, 14, 22, 92, 30, { strokeOpacity: .7 })}{rect(at, 14, 62, 92, 92, { fill: 'rgba(143,184,255,.18)' })}{rect(at, 14, 164, 92, 20, { strokeOpacity: .7 })}{rect(at, 34, 196, 52, 16, { fill: 'rgba(143,184,255,.35)' })}</> },
    { z: 77, w: 120, d: 230, label: 'LOGIC', draw: at => <>{rect(at, 40, 70, 40, 40, { fill: 'rgba(143,184,255,.25)' })}{rect(at, 30, 150, 26, 26)}{rect(at, 70, 150, 26, 26)}{line(at, 60, 110, 60, 150)}{line(at, 43, 150, 43, 124)}{line(at, 43, 124, 60, 124)}{line(at, 83, 150, 83, 124)}{line(at, 83, 124, 60, 124)}{line(at, 60, 70, 60, 30)}{line(at, 60, 30, 100, 30)}</> },
    { z: 20, w: 120, d: 230, label: 'SHELL', draw: at => <>{rect(at, 8, 8, 104, 214, { strokeOpacity: .6 })}{circle(at, 26, 26, 8)}{circle(at, 26, 26, 3, { fill: INK })}</> },
  ]} />;
}

/** 04 · Off the clock: coffee and code, exploded. */
export function OffClockBlueprint({ title }: { title: string }) {
  return <Scene id="bp-off" figure="FIG. 04" title={title} plates={[
    { z: 196, w: 150, d: 150, round: true, label: 'CODE', draw: at => {
      const wave = Array.from({ length: 40 }, (_, i) => at(12 + i * 3.2, 75 + Math.sin(i / 3) * 22));
      return <polyline points={poly(wave)} fill="none" stroke={INK} strokeWidth="1.4" />;
    } },
    { z: 128, w: 110, d: 110, round: true, label: 'COFFEE', draw: at => <>{circle(at, 55, 55, 34, { strokeOpacity: .6 })}{circle(at, 55, 55, 18, { strokeOpacity: .4 })}</> },
    { z: 74, w: 130, d: 130, round: true, label: 'CUP', draw: at => <>{circle(at, 65, 65, 54, { strokeOpacity: .6 })}</> },
    { z: 20, w: 200, d: 200, round: true, label: 'SAUCER', draw: at => <>{circle(at, 100, 100, 70, { strokeOpacity: .5 })}{circle(at, 100, 100, 40, { strokeOpacity: .3 })}</> },
  ]} />;
}
