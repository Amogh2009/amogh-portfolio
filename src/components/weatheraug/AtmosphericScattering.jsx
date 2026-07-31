import { useState } from 'react'

const objects = [40, 90, 150, 220, 300]
const K_MAX = 0.012 // extinction coefficient at max fog density

const lerp = (a, b, t) => a + (b - a) * t

export default function AtmosphericScattering() {
  const [density, setDensity] = useState(45)
  const k = (density / 100) * K_MAX

  return (
    <div className="viz">
      <div className="fog-stage">
        {objects.map((d) => {
          const contrast = Math.exp(-k * d)
          const shade = Math.round(lerp(210, 21, contrast))
          return (
            <div className="fog-object" key={d}>
              <div
                className="fog-object__shape"
                style={{ background: `rgb(${shade}, ${shade}, ${shade + 4})` }}
              />
              <span className="fog-object__label">
                {d}m · {(contrast * 100).toFixed(0)}%
              </span>
            </div>
          )
        })}
      </div>
      <div className="slider-row">
        <label htmlFor="fog-density">Fog density</label>
        <input
          id="fog-density"
          type="range"
          min="0"
          max="100"
          value={density}
          onChange={(e) => setDensity(Number(e.target.value))}
        />
        <span className="slider-row__value">{density}</span>
      </div>
      <p className="viz__caption">
        Koschmieder's law: contrast falls off as C(d) = C₀·e<sup>−kd</sup>. Denser fog
        (higher k) crushes contrast faster with distance — the far object fades into
        the haze long before the near one does.
      </p>
    </div>
  )
}
