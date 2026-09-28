import type { ReactNode } from 'react';

/**
 * Abstract line diagrams for How I work: thin strokes, dashed orbits with
 * arrows, wireframe spheres, bursts and sparkles on a transparent ground.
 * Each one stands for a working principle; motion is slow and CSS-only, so the
 * global reduced-motion rule freezes it.
 */

const C = { x: 240, y: 200 };
const LINE = 'rgba(220,230,255,.9)';
const SOFT = 'rgba(220,230,255,.45)';

function Frame({ id, index, children }: { id: string; index: string; children: ReactNode }) {
  return <svg className="dg" viewBox="0 0 480 400" aria-hidden="true">
    <defs>
      <marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M1 1L8 5L1 9" fill="none" stroke={LINE} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </marker>
      <clipPath id={`${id}-clip`}><rect x="1" y="1" width="478" height="398" rx="14" /></clipPath>
    </defs>
    <rect x="1" y="1" width="478" height="398" rx="14" fill="none" stroke={SOFT} strokeWidth="1" />
    <circle cx="22" cy="22" r="9" fill="none" stroke={SOFT} />
    <text x="22" y="25.5" className="dg-index" textAnchor="middle">{index}</text>
    <g clipPath={`url(#${id}-clip)`}>{children}</g>
  </svg>;
}

const arrow = (id: string) => `url(#${id}-arrow)`;

/** 01 · Ownership: one sphere holding every part, with an orbit that ties them together. */
export function OwnershipDiagram() {
  const R = 118;
  return <Frame id="dg-own" index="1">
    <g transform={`translate(${C.x} ${C.y})`}>
      <circle r={R} fill="none" stroke={LINE} strokeWidth="1.1" />
      {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map(k => {
        const y = k * 24, rx = Math.sqrt(R * R - y * y);
        return <ellipse key={k} cy={y} rx={rx} ry={rx * 0.16} fill="none" stroke={SOFT} strokeWidth=".9" />;
      })}
      {[0, 1, 2, 3, 4, 5].map(i => <ellipse key={i} className="dg-meridian" rx={Math.abs(R * Math.cos((i * Math.PI) / 6)) + 2} ry={R} fill="none" stroke={LINE} strokeWidth=".9" style={{ animationDelay: `${-i * 1.6}s` }} />)}
      <g transform="rotate(-14)">
        <ellipse className="dg-march" rx="206" ry="44" fill="none" stroke={LINE} strokeWidth="1.1" strokeDasharray="2 6" strokeLinecap="round" />
        <path d="M 150 30 A 206 44 0 0 1 40 43" fill="none" stroke={LINE} strokeWidth="1.2" markerEnd={arrow('dg-own')} />
        <path d="M -150 -30 A 206 44 0 0 1 -40 -43" fill="none" stroke={LINE} strokeWidth="1.2" markerEnd={arrow('dg-own')} />
      </g>
      <circle r="5" fill={LINE} />
    </g>
  </Frame>;
}

/** 02 · Collaboration: two fields of rings that overlap, with the hand-off running both ways. */
export function CollaborationDiagram() {
  const rings = [22, 40, 58, 76, 94];
  return <Frame id="dg-col" index="2">
    {[{ x: 178, delay: 0 }, { x: 302, delay: -2 }].map(({ x, delay }) => <g key={x} transform={`translate(${x} ${C.y})`}>
      {rings.map((r, i) => <circle key={r} className="dg-pulse" r={r} fill="none" stroke={i % 2 ? SOFT : LINE} strokeWidth=".95" style={{ animationDelay: `${delay - i * 0.35}s` }} />)}
      <circle r="4" fill={LINE} />
    </g>)}
    <path className="dg-march" d="M 178 92 C 205 50, 275 50, 302 92" fill="none" stroke={LINE} strokeWidth="1.1" strokeDasharray="2 6" strokeLinecap="round" markerEnd={arrow('dg-col')} />
    <path className="dg-march" d="M 302 308 C 275 350, 205 350, 178 308" fill="none" stroke={LINE} strokeWidth="1.1" strokeDasharray="2 6" strokeLinecap="round" markerEnd={arrow('dg-col')} />
    <line x1="240" y1="140" x2="240" y2="260" stroke={SOFT} strokeDasharray="1 5" strokeLinecap="round" />
  </Frame>;
}

/** 03 · Building: rings rising off a grid plane toward a spark, from sketch to something standing. */
export function BuildingDiagram() {
  const horizon = 318, vanish = { x: 240, y: 250 };
  const floor: ReactNode[] = [];
  for (let i = -6; i <= 6; i++) {
    const x = 240 + i * 42;
    floor.push(<line key={`v${i}`} x1={x} y1={390} x2={vanish.x + (x - vanish.x) * 0.35} y2={horizon} stroke={SOFT} strokeWidth=".9" />);
  }
  for (let j = 0; j < 5; j++) {
    const y = horizon + (390 - horizon) * ((j / 4) ** 1.6);
    const spread = 0.35 + 0.65 * ((y - horizon) / (390 - horizon));
    floor.push(<line key={`h${j}`} x1={240 - 252 * spread} y1={y} x2={240 + 252 * spread} y2={y} stroke={SOFT} strokeWidth=".9" />);
  }
  return <Frame id="dg-bld" index="3">
    {floor}
    {Array.from({ length: 7 }, (_, i) => <ellipse key={i} className="dg-rise" cx="240" cy={300 - i * 30} rx={78 - i * 5} ry={16 - i * 0.8} fill="none" stroke={i % 2 ? SOFT : LINE} strokeWidth="1" style={{ animationDelay: `${-i * 0.5}s` }} />)}
    <line x1="240" y1="300" x2="240" y2="82" stroke={LINE} strokeWidth="1.1" strokeDasharray="2 6" strokeLinecap="round" className="dg-march" markerEnd={arrow('dg-bld')} />
    <path className="dg-twinkle" d="M240 36 C242 52, 246 56, 262 58 C246 60, 242 64, 240 80 C238 64, 234 60, 218 58 C234 56, 238 52, 240 36 Z" fill="none" stroke={LINE} strokeWidth="1.2" />
  </Frame>;
}

/** 04 · Off the clock: a loose burst around a spiral, the curiosity that feeds the work. */
export function OffClockDiagram() {
  const rays = Array.from({ length: 36 }, (_, i) => {
    const a = (i / 36) * Math.PI * 2, long = i % 3 === 0, r0 = 52, r1 = long ? 160 : 118 + ((i * 17) % 5) * 6;
    return <line key={i} x1={Math.cos(a) * r0} y1={Math.sin(a) * r0} x2={Math.cos(a) * r1} y2={Math.sin(a) * r1} stroke={long ? LINE : SOFT} strokeWidth={long ? 1.1 : .9} strokeDasharray={i % 4 === 1 ? '2 5' : undefined} strokeLinecap="round" />;
  });
  const spiral = Array.from({ length: 180 }, (_, i) => {
    const t = i / 180 * Math.PI * 6, r = 4 + t * 2.2;
    return `${(Math.cos(t) * r).toFixed(1)},${(Math.sin(t) * r).toFixed(1)}`;
  }).join(' ');
  return <Frame id="dg-off" index="4">
    <g transform={`translate(${C.x} ${C.y})`}>
      <g className="dg-spin-slow">{rays}</g>
      <polyline className="dg-spin-rev" points={spiral} fill="none" stroke={LINE} strokeWidth="1.1" />
    </g>
    {[{ x: 88, y: 84, s: 12 }, { x: 398, y: 310, s: 16 }, { x: 404, y: 96, s: 8 }].map(({ x, y, s }, i) => <path key={i} className="dg-twinkle" style={{ animationDelay: `${-i * 1.1}s` }}
      d={`M${x} ${y - s} C${x + 1} ${y - s / 4}, ${x + s / 4} ${y - 1}, ${x + s} ${y} C${x + s / 4} ${y + 1}, ${x + 1} ${y + s / 4}, ${x} ${y + s} C${x - 1} ${y + s / 4}, ${x - s / 4} ${y + 1}, ${x - s} ${y} C${x - s / 4} ${y - 1}, ${x - 1} ${y - s / 4}, ${x} ${y - s} Z`} fill="none" stroke={LINE} strokeWidth="1.1" />)}
  </Frame>;
}
