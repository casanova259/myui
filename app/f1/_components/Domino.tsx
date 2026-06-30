"use client"

import { useEffect, useRef } from "react"
import { PROJECTS } from "./Images"
import gsap from "gsap"
import Image from "next/image"

const PROJECTS_PER_ROW = 9
const TOTAL_ROWS = 10

export default function Projects() {
    const sectionRef = useRef<HTMLElement>(null)
    const rowref = useRef<HTMLDivElement[]>([])
    const rowStartWidth = useRef(125)
    const rowEndWidth = useRef(500)

    useEffect(() => {
        const section = sectionRef.current
        if (!section) return

        const rows = rowref.current
        const isMobile = window.innerWidth < 1000
        rowStartWidth.current = isMobile ? 250 : 125
        rowEndWidth.current = isMobile ? 750 : 500

        const firstRow = rows[0]
        firstRow.style.width = `${rowEndWidth.current}%`
        const expandRowHeight = firstRow.offsetHeight
        firstRow.style.width = ""

        const sectionGap = parseFloat(getComputedStyle(section).gap) || 0
        const sectionPadding = parseFloat(getComputedStyle(section).paddingTop) || 0

        const expandedSectionHeight =
            expandRowHeight * rows.length +
            sectionGap * (rows.length - 1) +
            sectionPadding * 2

        section.style.height = `${expandedSectionHeight}px`

        // Reused on every frame so we don't allocate a new array each time
        const rowRects: DOMRect[] = new Array(rows.length)

        function onScrollUpdate() {
            const scrollY = window.scrollY
            const VwHeight = window.innerHeight

            // --- Cheap bail-out: skip everything if the section is nowhere
            // near the viewport. This is the only read we do up front, and
            // it avoids doing 10 rows' worth of work while the user is
            // scrolling through Hero/About instead.
            const sectionRect = section!.getBoundingClientRect()
            if (sectionRect.bottom < -VwHeight || sectionRect.top > VwHeight * 2) {
                return
            }

            // --- PASS 1: ALL READS ---
            // Measure every row first, before changing anything. This way
            // the browser answers all of them using the layout it already
            // has cached, instead of recalculating layout between each read.
            for (let i = 0; i < rows.length; i++) {
                rowRects[i] = rows[i].getBoundingClientRect()
            }

            // --- PASS 2: ALL WRITES ---
            // Now that we have every measurement we need, apply all the
            // style changes. No reads are interleaved here, so this doesn't
            // force any extra layout recalculation.
            for (let i = 0; i < rows.length; i++) {
                const row = rows[i]
                const rect = rowRects[i]
                const rowTop = rect.top + scrollY
                const rowBottom = rowTop + rect.height

                const scrollStart = rowTop - VwHeight
                const scrollEnd = rowBottom

                let prog = (scrollY - scrollStart) / (scrollEnd - scrollStart)
                prog = Math.max(0, Math.min(1, prog))

                const width =
                    rowStartWidth.current +
                    (rowEndWidth.current - rowStartWidth.current) * prog

                row.style.width = `${width}%`
            }
        }

        gsap.ticker.add(onScrollUpdate)

        const handleResize = () => {
            const isMobile = window.innerWidth < 1000
            rowStartWidth.current = isMobile ? 250 : 125
            rowEndWidth.current = isMobile ? 750 : 500

            firstRow.style.width = `${rowEndWidth.current}%`
            const newRowHeight = firstRow.offsetHeight
            firstRow.style.width = ""

            const newSectionHeight =
                newRowHeight * rows.length +
                sectionGap * (rows.length - 1) +
                sectionPadding * 2

            section.style.height = `${newSectionHeight}px`
        }

        window.addEventListener("resize", handleResize)

        return () => {
            gsap.ticker.remove(onScrollUpdate)
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    const rowsData = []
    let currentProjectIndex = 0

    for (let r = 0; r < TOTAL_ROWS; r++) {
        const projects = []
        for (let c = 0; c < PROJECTS_PER_ROW; c++) {
            projects.push(PROJECTS[currentProjectIndex % PROJECTS.length])
            currentProjectIndex++
        }
        rowsData.push(projects)
    }

    return (
        <section ref={sectionRef} className="projects">
            {rowsData.map((rowProjects, rowIndex) => (
                <div
                    key={rowIndex}
                    className="projects-row"
                    ref={(el) => {
                        if (el) rowref.current[rowIndex] = el
                    }}
                >
                    {rowProjects.map((project, colIndex) => (
                        <div key={colIndex} className="project">
                            <div className="project-img">
                                <Image
                                    src={project.img}
                                    alt={project.name}
                                    fill
                                    quality={85}
                                    priority={rowIndex === 0}
                                    sizes="80vw"
                                    className="object-cover"
                                />
                            </div>
                            <div className="project-info">
                                <p>{project.name}</p>
                                <p>{project.year}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </section>
    )
}