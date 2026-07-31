'use client'

import { useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, animate, useMotionValueEvent } from 'motion/react'

// ---- Config -----------------------------------------------------------
const RANGE: [number, number] = [-20, 20]
const TICK_WIDTH = 12 // px between ticks
const MAJOR_EVERY = 5 // every Nth tick is taller / labeled

type FractionalSliderProps = {
  min?: number
  max?: number
  defaultValue?: number
  onChange?: (value: number) => void
  className?: string
}

export default function FractionalSlider({
  min = RANGE[0],
  max = RANGE[1],
  defaultValue = 0,
  onChange,
  className = '',
}: FractionalSliderProps) {
  const items = Array.from({ length: max - min + 1 }, (_, i) => i + min)
  const maxOffset = (max - min) * TICK_WIDTH

  const x = useMotionValue(-defaultValue * TICK_WIDTH)
  const [value, setValue] = useState(defaultValue)
  const lastTickRef = useRef(defaultValue)
  const audioCtxRef = useRef<AudioContext | null>(null)

  // ---- Sound design ----------------------------------------------------
  // Synthesize a short click instead of shipping an audio asset.
  // Pitch rises slightly the further the value sits from center,
  // so the sound tracks intensity as well as motion.
  const playTick = useCallback((tickValue: number) => {
    if (typeof window === 'undefined') return
    const AudioCtx =
      window.AudioContext || (window as any).webkitAudioContext
    if (!AudioCtx) return

    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioCtx()
    }
    const ctx = audioCtxRef.current
    if (ctx.state === 'suspended') ctx.resume()

    const intensity = Math.min(Math.abs(tickValue) / max, 1)
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.value = 720 + intensity * 260

    gain.gain.setValueAtTime(0, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0.06 + intensity * 0.04, ctx.currentTime + 0.002)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.06)
  }, [max])

  // ---- Track drag position -> nearest tick value ------------------------
  useMotionValueEvent(x, 'change', (latest) => {
    const rawValue = Math.round(-latest / TICK_WIDTH)
    const clamped = Math.max(min, Math.min(max, rawValue))
    if (clamped !== lastTickRef.current) {
      lastTickRef.current = clamped
      setValue(clamped)
      onChange?.(clamped)
      playTick(clamped)
    }
  })

  const handleDragEnd = () => {
    // Snap firmly to the nearest tick with a light spring settle
    const target = -value * TICK_WIDTH
    animate(x, target, { type: 'spring', stiffness: 420, damping: 32 })
  }

  return (
    <div className={`select-none ${className}`}>
      <div className="flex flex-col items-center gap-3">
        <motion.div
          key={value}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-medium tabular-nums tracking-tight"
        >
          {value > 0 ? `+${value}` : value}
        </motion.div>

        <div className="relative w-full max-w-[420px] h-16 overflow-hidden">
          {/* Fixed center indicator */}
          <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-[2px] h-full bg-foreground/80 z-10" />

          {/* Edge fade masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-background to-transparent z-[5]" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background to-transparent z-[5]" />

          <motion.div
            drag="x"
            dragConstraints={{ left: -maxOffset, right: maxOffset }}
            dragElastic={0.08}
            dragMomentum={false}
            onDragEnd={handleDragEnd}
            style={{ x }}
            className="absolute left-1/2 top-0 flex h-full items-center cursor-grab active:cursor-grabbing"
          >
            {items.map((tick) => {
              const isMajor = tick % MAJOR_EVERY === 0
              const distance = Math.abs(tick - value)
              const active = distance === 0
              return (
                <div
                  key={tick}
                  style={{ width: TICK_WIDTH }}
                  className="flex flex-col items-center justify-center h-full shrink-0"
                >
                  <div
                    className="rounded-full transition-colors duration-150"
                    style={{
                      width: 2,
                      height: isMajor ? 28 : 14,
                      backgroundColor: active
                        ? 'var(--slider-active, #111)'
                        : `rgba(120,120,120,${Math.max(0.15, 0.6 - distance * 0.03)})`,
                    }}
                  />
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </div>
  )
}