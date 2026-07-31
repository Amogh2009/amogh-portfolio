import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const roles = [
  'computer vision research',
  'FRC software subsystem lead',
  'VEX software lead',
  'AI mentorship club founder',
]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIndex]
    const speed = deleting ? 30 : 60

    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1))
        if (text.length + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1200)
        }
      } else {
        setText(current.slice(0, text.length - 1))
        if (text.length - 1 === 0) {
          setDeleting(false)
          setRoleIndex((roleIndex + 1) % roles.length)
        }
      }
    }, speed)

    return () => clearTimeout(timeout)
  }, [text, deleting, roleIndex])

  return (
    <header className="hero">
      <p className="hero__eyebrow">// rising senior · saratoga, ca</p>
      <h1 className="hero__title">
        Amogh<span className="accent">.</span>
      </h1>
      <p className="hero__role">
        <span className="prompt">$</span> {text}
        <span className="cursor">|</span>
      </p>
      <p className="hero__blurb">
        I build systems that see and move: computer vision research,
        competition robotics, and helping other students break into AI.
      </p>
      <div className="hero__cta">
        <Link to="/work" className="btn btn--primary">
          View projects
        </Link>
        <Link to="/contact" className="btn btn--ghost">
          Get in touch
        </Link>
      </div>
    </header>
  )
}
