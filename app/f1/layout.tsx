import localFont from 'next/font/local'
import './f1.css'
import { Bebas_Neue, Inter } from 'next/font/google'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const neueHaas = localFont({
  src: '../../public/fonts/Neue Haas Grotesk Display Family/NeueHaasGrotDisp-75Bold-Trial.otf',
  variable: '--font-neue-haas',
})
export default function F1Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${bebasNeue.variable} ${inter.variable} ${neueHaas.variable}`}>
      {children}
    </div>
  )
}

