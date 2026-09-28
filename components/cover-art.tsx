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
    {/* A3Lab mark, dithered, sitting under the radar. */}
    <image className="radar-mark" href="/images/a3lab-mark-dither.webp" x="-170" y="-170" width="340" height="340" />
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

/** Avela: the app mark in the centre of a slow, breathing glow. */
function AvelaArt() {
  return <div className="art art-avela">
    <img className="art-avela-dither" src="/images/avela-glow-dither.webp" alt="" width="900" height="900" />
    <span className="art-avela-glow" />
    <img className="art-avela-mark" src="/images/avela-mark.webp" alt="" width="360" height="360" />
  </div>;
}

export function CoverArt({ slug }: { slug: string }) {
  if (slug === 'content-radar') return <RadarArt />;
  if (slug === 'mindyoung') return <MindYoungArt />;
  if (slug === 'avela') return <AvelaArt />;
  return null;
}

export const coverArtSlugs = new Set(['content-radar', 'mindyoung', 'avela']);
