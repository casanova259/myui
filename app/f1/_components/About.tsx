import Image from "next/image"

export default function About() {
    return (
        <section className="about ">
            <div className="about-content font-neue text-3xl flex items-center ">
                <h3 className="pt-4">Mercedes-AMG F1 — A legacy forged at 300km/h</h3>

                <div className="w-[1000px] h-[500px]  flex items-center justify-center">
                    <img src='/f1Scroll-optimized/14.jpg' className="z-10 grayscale-100" />
                    <div className="absolute bg-[#dedddd] w-[1020px] h-[520px]"/>

                </div>
                <p className="font-bebasNeue">From the pit lane to the podium, every detail engineered with purpose and relentless precision</p>
            </div>

        </section>
    )
}