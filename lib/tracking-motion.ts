export type ScanAnchor = { x: number; y: number; width: number; height: number };

// An illustrative scanner travels between flower-derived anchors. Each marker
// has its own pace and a brief acquisition hold; motion does not require input.
export function scanMarker(anchors: ScanAnchor[], marker: number, time: number) {
  if (!anchors.length) return null;
  const clock = time / (3.2 + marker * .37) + marker * .31;
  const step = Math.floor(clock), fraction = clock - step;
  const a = anchors[(marker + step) % anchors.length];
  const b = anchors[(marker + step + 1) % anchors.length];
  const travel = Math.max(0, Math.min(1, (fraction - .12) / .38));
  const response = (t: number) => 1 - Math.exp(-6 * t) * (Math.cos(9 * t) + (6 / 9) * Math.sin(9 * t));
  const t = response(travel) / response(1);
  const arch = Math.sin(travel * Math.PI) * (marker % 2 ? 1 : -1);
  return {
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t + arch * 14,
    width: Math.max(22, Math.min(82, a.width + (b.width - a.width) * t)) + Math.sin(travel * Math.PI) * 14,
    height: Math.max(22, Math.min(68, a.height + (b.height - a.height) * t)) + Math.sin(travel * Math.PI) * 10,
    locked: fraction < .12 || fraction > .5,
  };
}
