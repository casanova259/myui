"use client"

import { useState } from "react"
import { LineNav, type LineNavItem } from "./_components/line-nav"

const items: LineNavItem[] = [
  { title: "Introduction", href: "#introduction" },
  { title: "Why It Matters", href: "#why-it-matters" },
  { title: "Getting Started", href: "#getting-started" },
  { title: "Core Concepts", href: "#core-concepts" },
  { title: "Best Practices", href: "#best-practices" },
  { title: "Common Pitfalls", href: "#common-pitfalls" },
  { title: "Case Study", href: "#case-study" },
  { title: "Conclusion", href: "#conclusion" },
]

export default function LineNavShowcasePage() {
  const [activeHref, setActiveHref] = useState(items[3].href)

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="w-64">
        <LineNav
          items={items}
          activeHref={activeHref}
          onItemClick={(item, event) => {
            event.preventDefault()
            setActiveHref(item.href)
          }}
        />
      </div>
    </div>
  )
}