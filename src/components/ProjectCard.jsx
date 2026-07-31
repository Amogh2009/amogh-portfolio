import { useState } from 'react'

export default function ProjectCard({ project }) {
  const [open, setOpen] = useState(false)

  return (
    <article className="project">
      <div className="project__header" onClick={() => setOpen(!open)}>
        <span className="project__number">{project.number}</span>
        <div>
          <h3 className="project__title">{project.title}</h3>
          <p className="project__subtitle">{project.subtitle}</p>
        </div>
        <button
          className="project__toggle"
          aria-expanded={open}
          aria-label={open ? 'Collapse' : 'Expand'}
        >
          {open ? '−' : '+'}
        </button>
      </div>

      {open && (
        <div className="project__body">
          <p>{project.description}</p>
          {project.milestones?.length > 0 && (
            <ul className="project__milestones">
              {project.milestones.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          )}
          <div className="project__tags">
            {project.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}