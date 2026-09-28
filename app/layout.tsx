import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { siteUrl, indexable, alternatesFor } from '@/lib/site';
import './globals.css';
import './site.css';
const body=Inter({variable:'--font-manrope',subsets:['latin']});
const title='Otávio Ramos | Product Designer · Design & Code';
const description='Founding Product Designer at A3Lab, A3Media’s consumer-app studio. Consumer products, AI experiences, design systems, and hands-on building. Based in Brazil.';
export const metadata:Metadata={
  metadataBase:new URL(siteUrl),
  icons:{icon:[{url:'/favicon.svg',type:'image/svg+xml'},{url:'/icon.png',type:'image/png',sizes:'32x32'}],apple:'/apple-touch-icon.png'},
  title,
  description,
  alternates:alternatesFor('/'),
  openGraph:{type:'website',siteName:'Otávio Ramos',title,description,url:siteUrl,locale:'en_US',alternateLocale:['pt_BR'],images:[{url:'/og.jpg',width:1200,height:630,alt:'Otávio Ramos — Founding Product Designer'}]},
  twitter:{card:'summary_large_image',title,description,images:['/og.jpg']},
  robots:indexable?{index:true,follow:true}:{index:false,follow:false},
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" className={body.variable}><body>{children}</body></html>}
