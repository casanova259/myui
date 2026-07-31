'use client'

import { useState } from 'react'
import FractionalSlider from './_components/Slider'

export default function SliderDemoPage() {
  const [brightness, setBrightness] = useState(0)

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-10 bg-background px-6">
      <div className="text-center space-y-1">
        <h1 className="text-lg font-semibold">Brightness</h1>
        <p className="text-sm text-muted-foreground">
          Drag left or right, or use arrow keys after focusing the track.
        </p>
      </div>

      <FractionalSlider
        min={-20}
        max={20}
        defaultValue={0}
        onChange={setBrightness}
      />

      <p className="text-xs text-muted-foreground tabular-nums">
        current value: {brightness}
      </p>
    </main>
  )
}