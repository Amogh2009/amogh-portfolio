import { useState } from 'react'

const EMAIL = 'amogh.gupta17@gmail.com'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard API unavailable, fail silently
    }
  }

  return (
    <section className="section">
      <h2 className="section__heading">
        <span className="section__number">03</span> Contact
      </h2>
      <p className="contact__text">
        Always up for talking about computer vision, robotics, or anything
        autonomous-systems adjacent.
      </p>
      <div className="contact__actions">
        <button className="btn btn--primary" onClick={handleCopy}>
          {copied ? 'Copied!' : EMAIL}
        </button>
        <a className="btn btn--ghost" href="https://github.com/Amogh2009" target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a className="btn btn--ghost" href="https://www.linkedin.com/in/amogh-gupta-2372a9193/" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </div>
    </section>
  )
}
