import {Portfolio} from '@/components/portfolio';
import {alternatesForPt} from '@/lib/site';
const title='Otávio Ramos — Founding Product Designer';
const description='Único designer da A3Lab. Produtos B2C, experiências com IA, design systems e construção prática.';
export const metadata={title,description,alternates:alternatesForPt('/'),openGraph:{title,description,locale:'pt_BR',url:'/pt'}};
export default function Home(){return <Portfolio lang="pt"/>}
