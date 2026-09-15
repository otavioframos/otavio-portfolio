export type ScanAnchor = { x: number; y: number; width: number; height: number };

// An illustrative scanner travels between flower-derived anchors. Each marker
// has its own pace and a brief acquisition hold; motion does not require input.
export function scanMarker(anchors: ScanAnchor[], marker: number, time: number) {
  if (!anchors.length) return null;
  const clock = time / (4.2 + marker * .53) + marker * .31;
  const step = Math.floor(clock), fraction = clock - step;
  const a = anchors[(marker + step) % anchors.length];
  const b = anchors[(marker + step + 1) % anchors.length];
  const travel = Math.max(0, Math.min(1, (fraction - .18) / .7));
  const t = travel * travel * (3 - 2 * travel);
  const arch = Math.sin(t * Math.PI) * (marker % 2 ? 1 : -1);
  return {
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t + arch * 14,
    width: Math.max(22, Math.min(82, a.width + (b.width - a.width) * t)) + Math.sin(t * Math.PI) * 10,
    height: Math.max(22, Math.min(68, a.height + (b.height - a.height) * t)) + Math.sin(t * Math.PI) * 7,
    locked: fraction < .18 || fraction > .88,
  };
}
