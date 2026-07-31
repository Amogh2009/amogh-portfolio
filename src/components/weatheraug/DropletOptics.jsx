import { useEffect, useRef, useState } from 'react'

const R = 64
const CENTER = { x: 300, y: 150 }
const N_AIR = 1
const N_WATER = 1.33

const sub = (a, b) => ({ x: a.x - b.x, y: a.y - b.y })
const add = (a, b) => ({ x: a.x + b.x, y: a.y + b.y })
const scale = (a, s) => ({ x: a.x * s, y: a.y * s })
const dot = (a, b) => a.x * b.x + a.y * b.y
const norm = (a) => {
  const len = Math.hypot(a.x, a.y)
  return { x: a.x / len, y: a.y / len }
}
const reflect = (d, n) => {
  const dn = dot(d, n)
  return { x: d.x - 2 * dn * n.x, y: d.y - 2 * dn * n.y }
}
const refract = (d, n, eta) => {
  const cosi = -dot(d, n)
  const sin2t = eta * eta * (1 - cosi * cosi)
  if (sin2t > 1) return null
  const cost = Math.sqrt(1 - sin2t)
  return {
    x: eta * d.x + (eta * cosi - cost) * n.x,
    y: eta * d.y + (eta * cosi - cost) * n.y,
  }
}

// Second intersection of a line (through a point already on the circle) with that circle.
const chordExit = (p, dir) => {
  const t = -2 * dot(dir, sub(p, CENTER))
  return add(p, scale(dir, t))
}

function traceRay(entryAngleDeg) {
  const thetaI = (entryAngleDeg * Math.PI) / 180
  const h = R * Math.sin(thetaI)
  const P1 = { x: CENTER.x - Math.sqrt(R * R - h * h), y: CENTER.y - h }
  const N1 = norm(sub(P1, CENTER))
  const I = { x: 1, y: 0 }

  const T1 = refract(I, N1, N_AIR / N_WATER)
  if (!T1) return null

  const P2 = chordExit(P1, T1)
  const N2 = norm(sub(P2, CENTER))
  const R2dir = reflect(T1, N2)

  const P3 = chordExit(P2, R2dir)
  const N3 = norm(sub(P3, CENTER))
  const exitNormal = scale(N3, -1)
  const Texit = refract(R2dir, exitNormal, N_WATER / N_AIR)

  const frontReflect = reflect(I, N1)
  const thetaT = Math.asin(Math.sin(thetaI) / N_WATER)

  return { P1, P2, P3, I, T1, R2dir, Texit, frontReflect, thetaI, thetaT }
}

const pt = (p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`

export default function DropletOptics() {
  const [mode, setMode] = useState('physics')
  const [angle, setAngle] = useState(42)
  const [sweeping, setSweeping] = useState(false)
  const direction = useRef(1)

  useEffect(() => {
    if (!sweeping) return undefined
    const id = setInterval(() => {
      setAngle((prev) => {
        let next = prev + direction.current * 1.2
        if (next >= 78) {
          next = 78
          direction.current = -1
        } else if (next <= 10) {
          next = 10
          direction.current = 1
        }
        return next
      })
    }, 30)
    return () => clearInterval(id)
  }, [sweeping])

  const ray = traceRay(angle)

  return (
    <div className="viz">
      <div className="toggle-group">
        <button
          className={`toggle-btn${mode === 'synthetic' ? ' toggle-btn--active' : ''}`}
          onClick={() => setMode('synthetic')}
        >
          Streak overlay (synthetic)
        </button>
        <button
          className={`toggle-btn${mode === 'physics' ? ' toggle-btn--active' : ''}`}
          onClick={() => setMode('physics')}
        >
          Physics-based (ray traced)
        </button>
      </div>

      <div className="viz__stage">
        <span className="viz__stage-label">Scene behind droplet</span>
        <svg viewBox="0 0 600 300" className="viz__svg">
          {mode === 'synthetic' ? (
            <>
              <rect
                x={CENTER.x - 14}
                y={CENTER.y - 70}
                width="28"
                height="140"
                rx="14"
                fill="var(--muted)"
                opacity="0.5"
              />
            </>
          ) : (
            <>
              <circle
                cx={CENTER.x}
                cy={CENTER.y}
                r={R}
                fill="rgba(15,118,110,0.12)"
                stroke="var(--accent)"
                strokeOpacity="0.45"
                strokeWidth="1.5"
              />
              {ray && (
                <>
                  <line
                    x1={ray.P1.x - ray.I.x * 150}
                    y1={ray.P1.y - ray.I.y * 150}
                    x2={ray.P1.x}
                    y2={ray.P1.y}
                    stroke="var(--accent)"
                    strokeWidth="2"
                  />
                  <line
                    x1={ray.P1.x}
                    y1={ray.P1.y}
                    x2={ray.P1.x + ray.frontReflect.x * 90}
                    y2={ray.P1.y + ray.frontReflect.y * 90}
                    stroke="#b45309"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  <polyline
                    points={`${pt(ray.P1)} ${pt(ray.P2)} ${pt(ray.P3)}`}
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="2"
                  />
                  {ray.Texit && (
                    <line
                      x1={ray.P3.x}
                      y1={ray.P3.y}
                      x2={ray.P3.x + ray.Texit.x * 150}
                      y2={ray.P3.y + ray.Texit.y * 150}
                      stroke="var(--accent)"
                      strokeWidth="2"
                    />
                  )}
                </>
              )}
            </>
          )}
        </svg>
      </div>

      {mode === 'synthetic' ? (
        <p className="viz__caption">
          Flat gray streak — no depth, no light behavior. This is what a synthetic
          overlay draws: a shape, not an optical event.
        </p>
      ) : (
        <>
          <div className="slider-row">
            <label htmlFor="entry-angle">Entry angle</label>
            <input
              id="entry-angle"
              type="range"
              min="10"
              max="78"
              step="0.5"
              value={angle}
              onChange={(e) => {
                setSweeping(false)
                setAngle(Number(e.target.value))
              }}
            />
            <span className="slider-row__value">{angle.toFixed(0)}°</span>
            <button className="btn btn--ghost btn--small" onClick={() => setSweeping((s) => !s)}>
              {sweeping ? 'Stop' : '▶ Sweep'}
            </button>
          </div>
          <ul className="legend">
            <li>
              <span className="legend__swatch" style={{ background: 'var(--accent)' }} />
              Incoming light, refracted path, exit ray
            </li>
            <li>
              <span className="legend__swatch legend__swatch--dashed" />
              Partial front-surface reflection
            </li>
          </ul>
          {ray && (
            <p className="viz__caption">
              Light hits the droplet at {angle.toFixed(0)}°, refracts to{' '}
              {((ray.thetaT * 180) / Math.PI).toFixed(1)}° inside the water (n = 1.33),
              reflects once off the far wall, then refracts back out along a new path —
              a different direction than it entered.
            </p>
          )}
        </>
      )}
    </div>
  )
}
