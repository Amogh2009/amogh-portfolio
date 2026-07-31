import { useState } from 'react'

const FALL_SPEED_MPS = 9 // typical raindrop terminal velocity
const PX_PER_METER = 40

// slider is 0-100, mapped log-scale onto shutter speeds from 1/4000s to 1/15s
const minExp = 1 / 4000
const maxExp = 1 / 15
const sliderToExposure = (v) => minExp * Math.pow(maxExp / minExp, v / 100)

export default function MotionBlur() {
  const [slider, setSlider] = useState(55)
  const exposure = sliderToExposure(slider)
  const shutterLabel =
    exposure >= 1 ? `${exposure.toFixed(1)}s` : `1/${Math.round(1 / exposure)}s`

  const streakLength = Math.min(140, FALL_SPEED_MPS * exposure * PX_PER_METER)
  const blur = Math.min(3, streakLength * 0.03)

  return (
    <div className="viz">
      <div className="motion-stage">
        <div
          className="motion-stage__streak"
          style={{
            height: Math.max(6, streakLength),
            filter: `blur(${blur.toFixed(1)}px)`,
          }}
        />
      </div>
      <div className="slider-row">
        <label htmlFor="shutter-speed">Shutter speed</label>
        <input
          id="shutter-speed"
          type="range"
          min="0"
          max="100"
          value={slider}
          onChange={(e) => setSlider(Number(e.target.value))}
        />
        <span className="slider-row__value">{shutterLabel}</span>
      </div>
      <p className="viz__caption">
        A droplet falling at ~{FALL_SPEED_MPS} m/s smears into a streak whose length is
        fall-speed × exposure time. Fast shutters freeze it into a dot; slow shutters
        stretch it into the long soft streak most footage actually shows.
      </p>
    </div>
  )
}
