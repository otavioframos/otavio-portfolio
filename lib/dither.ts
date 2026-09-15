const bayer = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

// Ordered thresholding keeps the meadow legible with a coarse printed texture.
export function ditherMeadow(data: Uint8ClampedArray, width: number, options: { threshold?: number; accent?: 'red' | 'green' } = {}) {
  for (let i = 0; i < data.length; i += 4) {
    const pixel = i / 4, x = pixel % width, y = Math.floor(pixel / width);
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const light = Math.min(1, Math.pow((r * .2126 + g * .7152 + b * .0722) / 255, .65) * 1.55);
    const threshold = .18 + bayer[(y % 4) * 4 + x % 4] / 16 * .7 + (options.threshold ?? 0);
    const flower = r > 35 && r > g * 1.5 && r > b * 1.35;
    const color = light > threshold ? (flower ? (options.accent === 'green' ? [70, 160, 113] : [208, 65, 48]) : [136, 142, 126]) : [22, 24, 22];
    data[i] = color[0]; data[i + 1] = color[1]; data[i + 2] = color[2]; data[i + 3] = 255;
  }
  return data;
}
