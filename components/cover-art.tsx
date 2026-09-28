import { RibbonGlow } from '@/components/ribbon-glow';
import { AvelaGlow } from '@/components/avela-glow';

/**
 * Animated cover art drawn in code: crisp at any size, a few KB each, and
 * frozen by the global reduced-motion rule. Used on covers and More works cards.
 */

/** Content Radar: rings, a rotating sweep and blips that light as it passes. */
function RadarArt() {
  const blips = [
    { a: 38, r: 150 }, { a: 104, r: 205 }, { a: 170, r: 95 }, { a: 232, r: 180 }, { a: 300, r: 130 }, { a: 338, r: 222 },
  ];
  const period = 4.8;
  return <svg className="art art-radar" viewBox="-260 -260 520 520" aria-hidden="true">
    <defs>
      <linearGradient id="radar-sweep" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#8FB8FF" stopOpacity="0" />
        <stop offset="1" stopColor="#8FB8FF" stopOpacity=".55" />
      </linearGradient>
      <radialGradient id="radar-core"><stop offset="0" stopColor="#2F6BFF" stopOpacity=".35" /><stop offset="1" stopColor="#2F6BFF" stopOpacity="0" /></radialGradient>
    </defs>
    <circle r="250" fill="url(#radar-core)" />
    {/* The A3Lab mark is only lit where the beam has just passed, like a torch that fades behind it. */}
    <mask id="radar-torch" maskUnits="userSpaceOnUse" x="-260" y="-260" width="520" height="520">
      <g className="radar-sweep" style={{ animationDuration: `${period}s` }}>
        {Array.from({ length: 30 }, (_, i) => {
          const a0 = (-i * 5.4 * Math.PI) / 180, a1 = (-((i + 1) * 5.4 + 0.4) * Math.PI) / 180, R = 260;
          return <path key={i} d={`M0 0L${(Math.cos(a0) * R).toFixed(1)} ${(Math.sin(a0) * R).toFixed(1)}A${R} ${R} 0 0 0 ${(Math.cos(a1) * R).toFixed(1)} ${(Math.sin(a1) * R).toFixed(1)}Z`} fill="#fff" fillOpacity={((1 - i / 30) ** 1.6).toFixed(3)} />;
        })}
      </g>
    </mask>
    <image className="radar-ghost" href="/images/a3lab-mark-dither.webp" x="-235" y="-250" width="470" height="470" />
    <image className="radar-mark" href="/images/a3lab-mark-dither.webp" x="-235" y="-250" width="470" height="470" mask="url(#radar-torch)" />
    {[60, 120, 180, 240].map(r => <circle key={r} r={r} fill="none" stroke="#8FB8FF" strokeOpacity=".32" strokeWidth="1.2" />)}
    <path d="M-250 0H250M0-250V250" stroke="#8FB8FF" strokeOpacity=".2" strokeWidth="1" />
    {Array.from({ length: 36 }, (_, i) => {
      const a = (i * 10 * Math.PI) / 180, long = i % 3 === 0;
      return <line key={i} x1={Math.cos(a) * (long ? 228 : 234)} y1={Math.sin(a) * (long ? 228 : 234)} x2={Math.cos(a) * 240} y2={Math.sin(a) * 240} stroke="#8FB8FF" strokeOpacity=".45" />;
    })}
    <g className="radar-sweep" style={{ animationDuration: `${period}s` }}>
      <path d="M0 0 L240 0 A240 240 0 0 0 207.8 -120 Z" fill="url(#radar-sweep)" />
      <line x1="0" y1="0" x2="240" y2="0" stroke="#CFE0FF" strokeWidth="2" />
    </g>
    {blips.map(({ a, r }, i) => {
      const rad = (a * Math.PI) / 180;
      // Sweep turns clockwise from 0°; a blip lights when the leading edge reaches it.
      const delay = ((a / 360) * period).toFixed(2);
      return <g key={i} transform={`translate(${(Math.cos(rad) * r).toFixed(1)} ${(Math.sin(rad) * r).toFixed(1)})`}>
        <circle className="radar-ping" r="16" fill="none" stroke="#CFE0FF" style={{ animationDuration: `${period}s`, animationDelay: `${delay}s` }} />
        <circle className="radar-blip" r="4.5" fill="#EEF2FF" style={{ animationDuration: `${period}s`, animationDelay: `${delay}s` }} />
      </g>;
    })}
    <circle r="5" fill="#EEF2FF" />
  </svg>;
}

/** MindYoung: the mascot scales up into place, then keeps a gentle loop. */
function MindYoungArt() {
  return <div className="art art-owl">
    <img className="art-owl-phone" src="/images/mindyoung-train.webp" alt="" width="780" height="1688" />
    <span className="art-owl-shadow" />
    <img className="art-owl-mascot" src="/images/mindyoung-owl.webp" alt="" width="512" height="512" />
  </div>;
}

/** Avela: the hero's ribbon field in the product's sage and coral on a soft cream ground, with app pieces floating over it. */
function AvelaArt() {
  return <div className="art art-avela2">
    <RibbonGlow className="avela-field" background="#F4EFE7" color1="#3E7A6C" color2="#E3A58E" speed={30} size={130} angle={-150} hover={60} />
    <div className="avela-ui" aria-hidden="true">
      <div className="av-ui av-ui-meal">
        <div className="av-row"><span className="av-l">Lunch</span><span className="av-n">82</span></div>
        <b>Grain bowl</b>
        <div className="av-bars"><span>Protein</span><span className="av-seg">{Array.from({ length: 10 }, (_, i) => <i key={i} className={i < 6 ? 'on' : undefined} />)}</span><span>Fibre</span><span className="av-seg gold">{Array.from({ length: 10 }, (_, i) => <i key={i} className={i < 8 ? 'on' : undefined} />)}</span></div>
      </div>
      <p className="av-ui av-ui-coach">Nice balance. The fibre will carry you to the afternoon.</p>
      <div className="av-ui av-ui-day">
        <div className="av-day-sky">
          {[{ x: 18, l: 'Breakfast' }, { x: 44, l: 'Lunch' }, { x: 66, l: 'Snack' }, { x: 88, l: 'Dinner', todo: true }].map(m => <span key={m.l} className={'av-day-dot' + (m.todo ? ' todo' : '')} style={{ left: `${m.x}%` }} title={m.l} />)}
        </div>
        <div className="av-day-tx"><b>Today</b><small>3 of 4 meals · steady energy</small></div>
      </div>
      <div className="av-ui av-ui-plate">
        <div className="av-plate-ph"><span>82</span></div>
        <div className="av-day-tx"><b>Grain bowl</b><small>Balanced</small></div>
      </div>
      <img className="av-ui-mark" src="/images/avela-mark.webp" alt="" width="360" height="360" />
    </div>
  </div>;
}

/** Vela: the app mark over a green dithered glow, with pieces of the app in slow orbit. */
function VelaArt() {
  return <div className="art art-vela">
    {/* eslint-disable-next-line @next/next/no-page-custom-font */}
    <link rel="stylesheet" precedence="default" href="https://fonts.googleapis.com/css2?family=Instrument+Serif&display=swap" />
    <AvelaGlow color="rgb(110,190,150)" className="art-vela-dither" />
    <div className="vela-orbits" aria-hidden="true">
      <div className="vela-ring vela-r1"><div className="vela-chip"><span>Today’s allowance</span><b>R$ 196</b><i>on pace</i></div></div>
      <div className="vela-ring vela-r2"><div className="vela-chip"><span>Living pace</span><svg viewBox="0 0 80 28"><path d="M2 22 L14 18 L26 20 L38 12 L50 14 L62 7 L78 9" /></svg></div></div>
      <div className="vela-ring vela-r3"><div className="vela-chip"><span>Protected reserve</span><b>R$ 1.200</b></div></div>
      <div className="vela-ring vela-r4"><div className="vela-chip"><span>Monthly spend</span><em>{Array.from({ length: 12 }, (_, i) => <u key={i} style={{ opacity: [0.9, 0.3, 0.6, 0.2, 0.8, 0.4, 0.3, 0.7, 0.2, 0.5, 0.9, 0.35][i] }} />)}</em></div></div>
    </div>
    <img className="art-vela-mark" src="/images/vela-mark.svg" alt="" width="63" height="63" />
  </div>;
}

export function CoverArt({ slug }: { slug: string }) {
  if (slug === 'vela') return <VelaArt />;
  if (slug === 'content-radar') return <RadarArt />;
  if (slug === 'mindyoung') return <MindYoungArt />;
  if (slug === 'avela') return <AvelaArt />;
  return null;
}

export const coverArtSlugs = new Set(['content-radar', 'mindyoung', 'avela', 'vela']);
