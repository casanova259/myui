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

        function onScrollUpdate() {
            const scrollY = window.scrollY
            const VwHeight = window.innerHeight

            rows.forEach((row) => {
                const rect = row.getBoundingClientRect()
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
            })
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
                                    sizes="(max-width: 1000px) 30vw, 15vw"
                                    quality={75}
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