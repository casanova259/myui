import Sidebar from "@/components/scrambleNav/sidebar"

export default function ScrambleNav() {
    return (
        // <div className="flex items-center justify-center min-h-screen bg-[#111]">

        //     <Sidebar />
        // </div>
        <div className="relative flex min-h-screen">

            {/* Background image — only behind main content */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/knight.jpg')" }}
            />

            {/* Dark overlay so sidebar stays readable */}
            {/* <div className="absolute inset-0 bg-black/50" /> */}

            {/* Sidebar sits on top */}
            <div className="relative z-10">
                <Sidebar />
            </div>

        </div>

    )
}