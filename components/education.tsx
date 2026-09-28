import type { Lang } from '@/lib/projects';

const studies = [
  {
    institution: 'UX Design Institute × ESPM',
    en: ['International UX Design certification', 'In progress · 2026–2027'],
    pt: ['Certificação Internacional em UX Design', 'Em andamento · 2026–2027'],
  },
  {
    institution: 'Tera',
    en: ['Digital Product Design', '2023–2024'],
    pt: ['Digital Product Design', '2023–2024'],
  },
  {
    institution: 'Lorenna Mello',
    en: ['UX Research', 'Course'],
    pt: ['UX Research', 'Curso'],
  },
  {
    institution: 'FIAP',
    en: ['Systems Analysis and Development', 'Curso Superior de Tecnologia (CST) · Expected Aug 2027'],
    pt: ['Análise e Desenvolvimento de Sistemas', 'Curso Superior de Tecnologia (CST) · Previsão: ago. 2027'],
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
