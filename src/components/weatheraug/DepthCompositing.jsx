import { useState } from 'react'

const droplets = [
  { label: 'near · 2m', distance: 15 },
  { label: 'mid · 8m', distance: 50 },
  { label: 'far · 20m', distance: 90 },
]

export default function DepthCompositing() {
  const [focus, setFocus] = useState(50)

  return (
    <div className="viz">
      <div className="depth-row">
        {droplets.map((d) => {
          const blur = Math.min(10, Math.abs(d.distance - focus) * 0.28)
          const size = 44 - d.distance * 0.28
          const fade = Math.min(0.55, d.distance / 220)
          return (
            <div className="depth-panel" key={d.label}>
              <div className="depth-panel__stage">
                <div
                  className="depth-panel__droplet"
                  style={{
                    width: size,
                    height: size,
                    filter: `blur(${blur.toFixed(1)}px)`,
                    opacity: 1 - fade,
                  }}
                />
              </div>
              <span className="depth-panel__label">{d.label}</span>
            </div>
          )
        })}
      </div>
      <div className="slider-row">
        <label htmlFor="focus-distance">Focus distance</label>
        <input
          id="focus-distance"
          type="range"
          min="0"
          max="100"
          value={focus}
          onChange={(e) => setFocus(Number(e.target.value))}
        />
        <span className="slider-row__value">{focus}</span>
      </div>
      <p className="viz__caption">
        The same droplet, rendered at three distances against one background. Racking
        focus changes which droplet reads as sharp — near and far droplets don't just
        scale, they pick up depth-of-field blur and lose contrast to haze.
      </p>
    </div>
  )
}
