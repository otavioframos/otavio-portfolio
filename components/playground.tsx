'use client';

import { useEffect, useRef, useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ditherMeadow } from '@/lib/dither';
import type { Lang } from '@/lib/projects';
import { AeonMatrix } from '@/components/aeon-matrix';
import { TrackingStudy, type TrackingSettings } from '@/components/tracking-study';

export function Playground({ lang }: { lang: Lang }) {
  const pt = lang === 'pt';
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelsRef = useRef<ImageData | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [threshold, setThreshold] = useState(0);
  const [mode, setMode] = useState('red');
  const [spacing, setSpacing] = useState(4);
  const [ripple, setRipple] = useState(42);
  const [rippleOn, setRippleOn] = useState(false);
  const [tracking, setTracking] = useState<TrackingSettings>({ speed: 46, lockTime: 54, squares: 4, permanence: 52, lineWidth: 2, stability: 68 });

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
    ditherMeadow(data, original.width, { threshold: threshold / 100, accent: mode === 'green' ? 'green' : 'red', spacing, ripple: rippleOn ? ripple / 100 : 0 });
    context.putImageData(new ImageData(data, original.width, original.height), 0, 0);
  }, [ready, mode, threshold, spacing, ripple, rippleOn]);

  const updateTracking = (key: keyof TrackingSettings, value: number) => setTracking(previous => ({ ...previous, [key]: value }));

  return <section className="playground-section" id="playground" aria-labelledby="playground-title">
    <details className="playground-disclosure">
      <summary className="playground-heading">
        <span><span className="eyebrow">04 / {pt ? 'EXPERIMENTOS' : 'EXPERIMENTS'}</span><h2 id="playground-title">Playground</h2></span>
        <span className="playground-summary-action">{pt ? 'Abrir estudos' : 'Open studies'} <span aria-hidden="true">+</span></span>
      </summary>
      <div className="playground-body">
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
        <div className="study-control-grid">
          <label className="study-range"><span>{pt ? 'Espaçamento' : 'Dot spacing'} <output>{spacing}px</output></span><Slider min={1} max={8} step={1} value={[spacing]} disabled={!ready || mode === 'original'} onValueChange={value => setSpacing(Array.isArray(value) ? value[0] : value)} /></label>
          <label className="study-range"><span>{pt ? 'Intensidade do ripple' : 'Ripple intensity'} <output>{ripple}%</output></span><Slider min={0} max={100} step={1} value={[ripple]} disabled={!ready || mode === 'original'} onValueChange={value => setRipple(Array.isArray(value) ? value[0] : value)} /></label>
          <button type="button" className="study-control-button" aria-pressed={rippleOn} onClick={() => setRippleOn(value => !value)}>{rippleOn ? (pt ? 'Ripple ativo · simular de novo' : 'Ripple on · simulate again') : (pt ? 'Simular clique' : 'Simulate click')}</button>
        </div>
        <p className="study-footnote">{failed ? (pt ? 'Não foi possível carregar o estudo.' : 'The study could not load.') : (pt ? 'Estudo visual deste portfólio · 2026' : 'A visual study from this portfolio · 2026')}</p>
      </div>
      </div>
      <div className="aeon-study">
        <div className="aeon-matrix-frame"><AeonMatrix/><span className="aeon-matrix-label">AEON / PIXEL FIELD</span></div>
        <div className="aeon-study-copy">
          <p className="eyebrow">{pt ? 'CÓDIGO E INTERAÇÃO' : 'CODE & INTERACTION'}</p>
          <h3>{pt ? 'Um campo que respira.' : 'A field that breathes.'}</h3>
          <p>{pt ? 'Aeon é um app de planejamento financeiro que desenhei e construí sozinho para uso pessoal. O fundo em matriz de pixels responde ao toque e ao movimento do mouse.' : 'Aeon is a financial-planning app I designed and built solo for personal use. Its pixel matrix breathes with the field and responds to touch and mouse movement.'}</p>
          <a className="text-link" href="https://github.com/otavioframos/aeon">{pt ? 'Ver no GitHub' : 'View on GitHub'} ↗</a>
        </div>
      </div>
      <div className="tracking-study">
        <div className="tracking-study-visual"><TrackingStudy settings={tracking}/><span className="tracking-study-label">TRACKING / FIELD STUDY</span></div>
        <div className="tracking-study-copy">
          <p className="eyebrow">{pt ? 'MOVIMENTO E SISTEMAS' : 'MOTION & SYSTEMS'}</p>
          <h3>{pt ? 'Quando o sistema encontra o gesto.' : 'When the system finds the gesture.'}</h3>
          <p>{pt ? 'Um rastreador visual para testar ritmo, estabilidade e resposta. Ajuste cada variável e observe a linha encontrar o movimento.' : 'A visual tracker for testing rhythm, stability, and response. Tune each variable and watch the line find the movement.'}</p>
          <div className="study-control-grid tracking-controls">
            <label className="study-range"><span>{pt ? 'Velocidade' : 'Speed'} <output>{tracking.speed}</output></span><Slider min={0} max={100} step={1} value={[tracking.speed]} onValueChange={value => updateTracking('speed', Array.isArray(value) ? value[0] : value)}/></label>
            <label className="study-range"><span>{pt ? 'Tempo para travar' : 'Time to lock'} <output>{tracking.lockTime}</output></span><Slider min={0} max={100} step={1} value={[tracking.lockTime]} onValueChange={value => updateTracking('lockTime', Array.isArray(value) ? value[0] : value)}/></label>
            <label className="study-range"><span>{pt ? 'Quantidade de quadrados' : 'Squares'} <output>{tracking.squares}</output></span><Slider min={1} max={8} step={1} value={[tracking.squares]} onValueChange={value => updateTracking('squares', Array.isArray(value) ? value[0] : value)}/></label>
            <label className="study-range"><span>{pt ? 'Permanência' : 'Permanence'} <output>{tracking.permanence}</output></span><Slider min={0} max={100} step={1} value={[tracking.permanence]} onValueChange={value => updateTracking('permanence', Array.isArray(value) ? value[0] : value)}/></label>
            <label className="study-range"><span>{pt ? 'Largura da linha' : 'Line width'} <output>{tracking.lineWidth}px</output></span><Slider min={1} max={6} step={1} value={[tracking.lineWidth]} onValueChange={value => updateTracking('lineWidth', Array.isArray(value) ? value[0] : value)}/></label>
            <label className="study-range"><span>{pt ? 'Estabilidade' : 'Stability'} <output>{tracking.stability}</output></span><Slider min={0} max={100} step={1} value={[tracking.stability]} onValueChange={value => updateTracking('stability', Array.isArray(value) ? value[0] : value)}/></label>
          </div>
        </div>
      </div>
      </div>
    </details>
  </section>;
}
