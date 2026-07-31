import { Link, Navigate, useParams } from 'react-router-dom'
import { projects } from '../data/projects'

export default function ProjectDetail() {
  const { id } = useParams()
  const project = projects.find((p) => p.id === id)

  if (!project) return <Navigate to="/work" replace />

  return (
    <section className="section project-detail">
      <Link to="/work" className="project-detail__back">
        ← Back to projects
      </Link>
      <h2 className="project-detail__title">
        <span className="project__number">{project.number}</span> {project.title}
      </h2>
      <p className="project-detail__subtitle">{project.subtitle}</p>
      <p className="project-detail__description">{project.description}</p>
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
    </section>
  )
}
