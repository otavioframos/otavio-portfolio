'use client';

import { useEffect, useRef, useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ditherMeadow } from '@/lib/dither';
import type { Lang } from '@/lib/projects';

export function Playground({ lang }: { lang: Lang }) {
  const pt = lang === 'pt';
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelsRef = useRef<ImageData | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [threshold, setThreshold] = useState(0);
  const [mode, setMode] = useState('red');

  useEffect(() => {
    const image = new Image();
    let disposed = false;
    image.onload = () => {
      if (disposed) return;
      const canvas = canvasRef.current;
      const context = canvas?.getContext('2d');
      if (!canvas || !context) { setFailed(true); return; }
      canvas.width = 480;
      canvas.height = Math.round(480 * image.height / image.width);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      pixelsRef.current = context.getImageData(0, 0, canvas.width, canvas.height);
      setReady(true);
    };
    image.onerror = () => { if (!disposed) setFailed(true); };
    image.src = '/images/meadow.jpg';
    return () => { disposed = true; image.onload = null; image.onerror = null; };
  }, []);

  useEffect(() => {
    const original = pixelsRef.current;
    const context = canvasRef.current?.getContext('2d');
    if (!ready || !original || !context || mode === 'original') return;
    // Start with untouched pixels each time; never dither an already processed frame.
    const data = new Uint8ClampedArray(original.data);
    ditherMeadow(data, original.width, { threshold: threshold / 100, accent: mode === 'green' ? 'green' : 'red' });
    context.putImageData(new ImageData(data, original.width, original.height), 0, 0);
  }, [ready, mode, threshold]);

  return <section className="playground-section" id="playground" aria-labelledby="playground-title">
    <div className="playground-heading">
      <h2 id="playground-title">Playground</h2>
      <p>{pt ? 'Pequenos experimentos com imagem e interação.' : 'Small experiments with images and interaction.'}</p>
    </div>
    <div className="playground-study">
      <figure className="dither-study-image">
        <img src="/images/meadow.jpg" alt={pt ? 'Campo de flores usado no estudo de dithering.' : 'A flower meadow used for the dithering study.'} width="1672" height="941" loading="lazy"/>
        <canvas ref={canvasRef} aria-hidden="true" hidden={!ready || mode === 'original'}/>
        <figcaption>{mode === 'original' ? (pt ? 'IMAGEM ORIGINAL' : 'ORIGINAL IMAGE') : 'ORDERED DITHERING'}</figcaption>
      </figure>
      <div className="dither-study-controls">
        <p className="eyebrow">CANVAS / IMAGE PROCESSING</p>
        <h3>{pt ? 'Do campo à textura.' : 'From meadow to texture.'}</h3>
        <p>{pt ? 'O tratamento de imagem do hero, aberto para experimentar. Mude o limiar para ver quais detalhes ficam e quais desaparecem.' : 'The image treatment from the hero, opened up to play with. Move the threshold to see which details stay and which disappear.'}</p>
        <div className="dither-palette">
          <span id="palette-label">{pt ? 'Tratamento' : 'Treatment'}</span>
          <ToggleGroup value={[mode]} onValueChange={values => { if (values.length) setMode(values[0] as string); }} aria-labelledby="palette-label" disabled={!ready} className="study-toggles">
            <ToggleGroupItem value="red">{pt ? 'Vermelho' : 'Red'}</ToggleGroupItem>
            <ToggleGroupItem value="green">{pt ? 'Verde' : 'Green'}</ToggleGroupItem>
            <ToggleGroupItem value="original">{pt ? 'Original' : 'Original'}</ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className="dither-threshold">
          <div><span id="threshold-label">{pt ? 'Limiar' : 'Threshold'}</span><output>{threshold > 0 ? '+' : ''}{threshold}</output></div>
          <Slider aria-labelledby="threshold-label" min={-20} max={20} step={1} value={[threshold]} disabled={!ready || mode === 'original'} onValueChange={value => setThreshold(Array.isArray(value) ? value[0] : value)} />
        </div>
        <p className="study-footnote">{failed ? (pt ? 'Não foi possível carregar o estudo.' : 'The study could not load.') : (pt ? 'Estudo visual deste portfólio · 2026' : 'A visual study from this portfolio · 2026')}</p>
      </div>
    </div>
  </section>;
}
