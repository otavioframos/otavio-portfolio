import type { Metadata } from 'next';
import { Barlow_Condensed, Manrope, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import './refinements.css';
const display=Barlow_Condensed({variable:'--font-barlow',weight:['500','600'],subsets:['latin']});
const body=Manrope({variable:'--font-manrope',subsets:['latin']});
const mono=IBM_Plex_Mono({variable:'--font-ibm',weight:['400','500'],subsets:['latin']});
export const metadata:Metadata={title:'Otávio Ramos — Product Designer',description:'Sole designer at A3Lab. Consumer products, AI experiences, design systems, and hands-on building. Based in Brazil.',robots:{index:false,follow:false}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body className={`${display.variable} ${body.variable} ${mono.variable}`}>{children}</body></html>}
