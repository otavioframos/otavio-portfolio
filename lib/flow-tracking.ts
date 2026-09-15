export type Region = { x: number; y: number; width: number; height: number; cx: number; cy: number; area: number };
export type Track = Region & { id: number; trail: { x: number; y: number }[] };

// A procedural flowing scalar field. Its thresholded regions are measured below,
// so every box is attached to the rendered field rather than a random position.
export function flowField(x: number, y: number, time: number, pointerX: number, pointerY: number) {
  const dx = x - pointerX, dy = y - pointerY;
  const influence = Math.exp(-(dx * dx + dy * dy) * 7);
  const u = x * 4.6 + Math.sin(y * 5.2 - time * 0.31) * 0.56 + dy * influence * 1.8;
  const v = y * 4.6 + Math.sin(x * 4.7 + time * 0.24) * 0.64 - dx * influence * 1.8;
  const warp = Math.sin(u * 2.1 + Math.cos(v * 1.9 + time * 0.2));
  return 0.5 + 0.25 * Math.sin(u * 3.5 + v * 1.4 + warp * 1.7 + time * 0.28)
    + 0.16 * Math.cos(v * 4.2 - u * 1.1 + warp - time * 0.18)
    + 0.06 * Math.sin(u * 8.4 + v * 5.1);
}

export function detectRegions(field: Float32Array, width: number, height: number, threshold = 0.73): Region[] {
  const seen = new Uint8Array(field.length);
  const queue = new Int32Array(field.length);
  const regions: Region[] = [];
  for (let start = 0; start < field.length; start++) {
    if (seen[start] || field[start] < threshold) continue;
    let head = 0, tail = 1;
    queue[0] = start; seen[start] = 1;
    let minX = width, maxX = 0, minY = height, maxY = 0, sumX = 0, sumY = 0;
    while (head < tail) {
      const index = queue[head++], x = index % width, y = Math.floor(index / width);
      minX = Math.min(minX, x); maxX = Math.max(maxX, x);
      minY = Math.min(minY, y); maxY = Math.max(maxY, y);
      sumX += x; sumY += y;
      const visit = (next: number) => {
        if (!seen[next] && field[next] >= threshold) { seen[next] = 1; queue[tail++] = next; }
      };
      if (x > 0) visit(index - 1);
      if (x < width - 1) visit(index + 1);
      if (y > 0) visit(index - width);
      if (y < height - 1) visit(index + width);
    }
    if (tail < 12 || tail > width * height * 0.16) continue;
    regions.push({ x: minX / width, y: minY / height, width: (maxX - minX + 1) / width,
      height: (maxY - minY + 1) / height, cx: (sumX / tail + 0.5) / width,
      cy: (sumY / tail + 0.5) / height, area: tail });
  }
  return regions.sort((a, b) => b.area - a.area).slice(0, 12);
}

export function associateRegions(regions: Region[], previous: Track[], nextId: () => number): Track[] {
  const available = new Set(previous.map(p => p.id));
  return regions.map(region => {
    let closest: Track | undefined, best = 0.13;
    for (const track of previous) {
      const distance = Math.hypot(track.cx - region.cx, track.cy - region.cy);
      if (available.has(track.id) && distance < best) { closest = track; best = distance; }
    }
    if (closest) available.delete(closest.id);
    return { ...region, id: closest?.id ?? nextId(), trail: [...(closest?.trail ?? []), { x: region.cx, y: region.cy }].slice(-22) };
  });
}
