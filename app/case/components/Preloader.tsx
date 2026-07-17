'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'

gsap.registerPlugin(Flip)

/**
 * Preloader
 *
 * 1. Counter goes 0 -> 100 in 14 "chunky" steps (steps(14) ease) over a
 *    fixed 3s, so the motion feels consistent every visit.
 * 2. In parallel, kicks off the REAL preload of the showreel video (and
 *    anything flagged with [data-preload]).
 * 3. When the counter finishes, waits for those real assets if they're
 *    not ready yet — this is what makes it reliable, not just decorative.
 * 4. Then: Flip the showreel from its preloader position/size into its
 *    real layout position/size, while this frame wipes away via
 *    clip-path in parallel.
 */
export default function Preloader({ showreelId = 'showreel', onComplete }) {
  const rootRef = useRef(null)
  const frameRef = useRef(null)
  const counterRef = useRef(null)
  const progress = useRef({ value: 0 })
  const [done, setDone] = useState(false)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const showreel = document.getElementById(showreelId)
      const assetsReady = preloadAssets(showreel)

      const tl = gsap.timeline({ onComplete: reveal })

      tl.to(progress.current, {
        duration: 3,
        ease: 'steps(14)',
        value: 100,
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = Math.round(progress.current.value)
          }
        },
      })

      async function reveal() {
        // wait here if real assets are still loading
        await assetsReady

        if (showreel) {
          const state = Flip.getState(showreel)
          showreel.classList.remove('--preloading-showreel')

          Flip.from(state, {
            absolute: true,
            duration: 1,
            ease: 'expo.inOut',
            scale: true,
            simple: true,
          })
        }

        gsap.to(frameRef.current, {
          clipPath: 'inset(100% 0rem 0rem)',
          duration: 1,
          ease: 'expo.inOut',
          onComplete: () => {
            setDone(true)
            onComplete?.()
          },
        })
      }
    }, rootRef)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (done) return null

  return (
    <div ref={rootRef} className="preloader__grid relative grid container">
      <div
        ref={frameRef}
        className="preloader__background absolute top-0 left-0 size-full bg-white -z-10"
        style={{ clipPath: 'inset(0rem 0rem 0rem 0rem)' }}
      />

      <div className="col-span-2 s:col-span-5 col-start-2 s:col-start-3 h-[100svh] flex flex-col s:flex-row justify-center s:justify-between items-center gap-y-12">
        <div className="overflow-hidden">
          <div
            className="preloader__progress__title text-lg font-medium uppercase translate-y-[105%] --is-visible"
            data-animation-trigger
          >
            Loading
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            ref={counterRef}
            className="preloader__progress__percentage text-lg font-medium uppercase translate-y-[105%] --is-visible"
            data-animation-trigger
          >
            0
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Preloads the showreel video (waits until it can play through without
 * stalling) plus anything flagged with data-preload. Never throws — a
 * failed asset just resolves so the preloader can't get stuck forever.
 */
function preloadAssets(video) {
  const videoReady = video
    ? new Promise((resolve) => {
        if (video.readyState >= 3) return resolve()
        const done = () => resolve()
        video.addEventListener('canplaythrough', done, { once: true })
        video.addEventListener('error', done, { once: true })
        video.load()
      })
    : Promise.resolve()

  const extraSources = Array.from(document.querySelectorAll('[data-preload]'))
    .map((el) => el.currentSrc || el.src)
    .filter(Boolean)

  const imagesReady = Promise.all(
    extraSources.map(
      (src) =>
        new Promise((resolve) => {
          const img = new window.Image()
          img.onload = resolve
          img.onerror = resolve
          img.src = src
        })
    )
  )

  return Promise.all([videoReady, imagesReady])
}