import Hero from '@/app/f1/_components/Hero'
import About from '@/app/f1/_components/About'
import "./f1.css"
import Projects from './_components/Domino'
import HUD from './_components/Hud'

export default function F1() {
    return (
        <main>
            <Hero />
            <About />
            <Projects/>
            {/* <HUD/> */}
        </main>
    )
}