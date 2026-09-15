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
  return (
    <section className="education" aria-labelledby="education-title">
      <div className="education-heading">
        <p className="eyebrow">{lang === 'en' ? 'EDUCATION & CONTINUED LEARNING' : 'FORMAÇÃO E APRENDIZADO CONTÍNUO'}</p>
        <h3 id="education-title">{lang === 'en' ? 'A foundation that keeps growing.' : 'Uma base que continua crescendo.'}</h3>
      </div>
      <ul className="education-list">
        {studies.map((study) => (
          <li key={study.institution}>
            <div>
              <h4>{study[lang][0]}</h4>
              <p>{study.institution}</p>
            </div>
            <p className="education-detail">{study[lang][1]}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
