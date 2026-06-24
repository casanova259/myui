import Desk from "./_components/desk";
import gsap from "gsap";
import {Flip} from "gsap/all";
import "./globals.css"

gsap.registerPlugin(Flip)


export default function Page()
{
    return(
        <div className="min-h-screen flex flex-col gap-7 items-center justify-center">
            <Desk/>
        </div>
    )
}