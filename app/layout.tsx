import type { Metadata } from 'next';
import { Barlow_Condensed, Manrope, Instrument_Serif, Pixelify_Sans, Syne } from 'next/font/google';
import './globals.css';
import './refinements.css';
import './nature.css';
const display=Barlow_Condensed({variable:'--font-barlow',weight:['300','500','600'],subsets:['latin']});
const body=Manrope({variable:'--font-manrope',subsets:['latin']});
const identity=Syne({variable:'--font-identity',weight:['600','700','800'],subsets:['latin']});
const editorial=Instrument_Serif({variable:'--font-editorial',weight:'400',subsets:['latin']});
const pixel=Pixelify_Sans({variable:'--font-pixel',weight:'400',subsets:['latin']});
export const metadata:Metadata={title:'Otávio Ramos — Founding Product Designer',description:'Founding Product Designer at A3Lab, A3Media’s consumer-app studio. Consumer products, AI experiences, design systems, and hands-on building. Based in Brazil.',robots:{index:false,follow:false}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body className={`${display.variable} ${body.variable} ${editorial.variable} ${pixel.variable} ${identity.variable}`}>{children}</body></html>}
