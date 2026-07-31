import { Link } from 'react-router-dom'
import { projects } from '../../data/projects'
import DropletOptics from '../../components/weatheraug/DropletOptics'
import DepthCompositing from '../../components/weatheraug/DepthCompositing'
import MotionBlur from '../../components/weatheraug/MotionBlur'
import AtmosphericScattering from '../../components/weatheraug/AtmosphericScattering'

const project = projects.find((p) => p.id === 'weatheraug')

export default function WeatherAugDetail() {
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

      <div className="viz-section">
        <h3 className="viz-section__heading">Droplet optics</h3>
        <p className="viz-section__intro">
          A synthetic streak is a gray shape. A real droplet is a tiny lens: light
          refracts going in, partially reflects off the far wall, and exits along a
          different path than it entered. Drag the slider or hit sweep to trace that
          path across entry angles.
        </p>
        <DropletOptics />
      </div>

      <div className="viz-section">
        <h3 className="viz-section__heading">Depth compositing</h3>
        <p className="viz-section__intro">
          The same droplet doesn't look the same at every distance — focus, size, and
          haze all shift with it.
        </p>
        <DepthCompositing />
      </div>

      <div className="viz-section">
        <h3 className="viz-section__heading">Motion blur</h3>
        <p className="viz-section__intro">
          Rain rarely appears as a sharp circle — the camera's shutter speed decides
          how much of the fall gets smeared into the frame.
        </p>
        <MotionBlur />
      </div>

      <div className="viz-section">
        <h3 className="viz-section__heading">Atmospheric scattering</h3>
        <p className="viz-section__intro">
          Precipitation also scatters light between the camera and everything behind
          it, washing out distant contrast independent of any single droplet.
        </p>
        <AtmosphericScattering />
      </div>

      <div className="callout">
        <p className="callout__heading">What's still missing</p>
        <p>
          These demos cover droplet optics, defocus, motion streak, and haze — but not
          road-surface reflection or lens glare, both of which real precipitation
          produces and synthetic compositing skips. That gap lines up with this
          project's actual finding: synthetic generators reproduce occlusion and
          lighting shifts well, but miss the edge distortion and noise texture that
          real precipitation introduces — which is exactly what a raytraced droplet
          has and a gray streak doesn't.
        </p>
      </div>
    </section>
  )
}
