import type { Lang } from '@/lib/projects';

const studies = [
  {
    institution: 'UX Design Institute × ESPM',
    en: ['International UX Design certification', 'Certified · 2026'],
    pt: ['Certificação Internacional em UX Design', 'Certificação concluída · 2026'],
  },
  {
    institution: 'Lorenna Mello',
    en: ['Discovery Sprint · UX research', 'Certificate · 2026 · 24 h'],
    pt: ['Discovery Sprint · pesquisa em UX', 'Certificado · 2026 · 24 h'],
  },
  {
    institution: 'Tera',
    en: ['Digital Product Design', '2023–2024'],
    pt: ['Digital Product Design', '2023–2024'],
  },
  {
    institution: 'FIAP',
    en: ['Systems Analysis and Development', 'Curso Superior de Tecnologia (CST) · Expected mid-2027'],
    pt: ['Análise e Desenvolvimento de Sistemas', 'Curso Superior de Tecnologia (CST) · Previsão: meados de 2027'],
  },
];

export function Education({ lang }: { lang: Lang }) {
  return <div className="grid block ruled">
    <h3 className="label">{lang === 'en' ? 'Education' : 'Formação'}</h3>
    <dl className="rows">
      {studies.map(study => <div className="row" key={study.institution}>
        <dt>{study[lang][0]}</dt>
        <dd>{study.institution}<span>{study[lang][1]}</span></dd>
      </div>)}
    </dl>
  </div>;
}
