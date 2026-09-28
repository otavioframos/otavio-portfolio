// Generates the dithered A3Lab mark used by the Content Radar cover.
// (Avela's glow is drawn live on a canvas: components/avela-glow.tsx.)
// Run: node scripts/dither-assets.mjs  (outputs to public/images)
import sharp from 'sharp';

const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map(v => (v + 0.5) / 16);
const CELL = 3; // one dither dot per 3×3 px block

/** Turn a greyscale intensity field into coloured square dots on transparency. */
async function dither(width, height, intensity, [r, g, b], out) {
  const rgba = Buffer.alloc(width * height * 4);
  for (let y = 0; y < height; y += CELL) for (let x = 0; x < width; x += CELL) {
    const cx = Math.floor(x / CELL), cy = Math.floor(y / CELL);
    const v = intensity(x + CELL / 2, y + CELL / 2);
    if (v <= BAYER[(cy % 4) * 4 + (cx % 4)]) continue;
    for (let dy = 0; dy < CELL - 1; dy++) for (let dx = 0; dx < CELL - 1; dx++) {
      const i = ((y + dy) * width + (x + dx)) * 4;
      if (i + 3 >= rgba.length) continue;
      rgba[i] = r; rgba[i + 1] = g; rgba[i + 2] = b; rgba[i + 3] = 255;
    }
  }
  await sharp(rgba, { raw: { width, height, channels: 4 } }).webp({ lossless: true }).toFile(out);
}

// A3Lab mark: rasterise the SVG, then shade it with a soft radial falloff so the dots thin toward the edges.
const S = 900;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-40 -60 430 430" width="${S}" height="${S}"><path fill="#fff" d="M347.12,286.36L185.48,6.38c-4.91-8.51-17.19-8.51-22.1,0L1.73,286.36c-4.91,8.51,1.23,19.14,11.05,19.14h323.29c9.82,0,15.96-10.63,11.05-19.14ZM257.1,205.02l-36.04,62.39c-2.27,3.94-6.48,6.36-11.02,6.36h-71.42c-4.55,0-8.75-2.43-11.02-6.36l-35.85-62.08c-2.27-3.94-2.28-8.79,0-12.73l34.32-59.44c2.27-3.94,6.48-6.37,11.03-6.37h74.83c4.55,0,8.75,2.43,11.02,6.36l34.15,59.13c2.28,3.94,2.28,8.79,0,12.73ZM232.33,203.6l-25.24,43.69c-1.59,2.76-4.54,4.46-7.72,4.46h-50.02c-3.19,0-6.13-1.7-7.72-4.46l-25.11-43.48c-1.59-2.76-1.59-6.16,0-8.92l24.04-41.63c1.59-2.76,4.54-4.46,7.72-4.46h52.41c3.19,0,6.13,1.7,7.72,4.46l23.92,41.42c1.59,2.76,1.59,6.16,0,8.92Z"/></svg>`;
const mask = await sharp(Buffer.from(svg)).greyscale().raw().toBuffer();
await dither(S, S, (x, y) => {
  const m = mask[Math.floor(y) * S + Math.floor(x)] / 255;
  const d = Math.hypot(x - S / 2, y - S * 0.55) / (S * 0.5);
  return m * (0.95 - d * 0.55);
}, [143, 184, 255], 'public/images/a3lab-mark-dither.webp');

console.log('done');
