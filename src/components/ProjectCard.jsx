import { Link } from 'react-router-dom'

export default function ProjectCard({ project }) {
  return (
    <Link to={`/work/${project.id}`} className="project">
      <div className="project__header">
        <span className="project__number">{project.number}</span>
        <div>
          <h3 className="project__title">{project.title}</h3>
          <p className="project__subtitle">{project.subtitle}</p>
        </div>
        <span className="project__arrow" aria-hidden="true">
          →
        </span>
      </div>
      <div className="project__tags">
        {project.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </Link>
  )
}
