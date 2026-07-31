const facts = [
  { label: 'school', value: 'Saratoga High School' },
  { label: 'location', value: 'Bay Area, CA' },
  { label: 'focus', value: 'computer vision, robotics, autonomous systems' },
  { label: 'also', value: 'saxophone · F1 · car tech' },
]

export default function About() {
  return (
    <section id="about" className="section">
      <h2 className="section__heading">
        <span className="section__number">01</span> About
      </h2>
      <div className="about">
        <p className="about__text">
          I'm a rising senior with a long-standing interest in autonomous
          systems, which is what pulled me toward computer vision research
          and what keeps me on my robotics team's software side. Outside of
          that, I lead an AI mentorship club at school and play saxophone in
          the wind ensemble.
        </p>
        <dl className="about__facts">
          {facts.map((fact) => (
            <div key={fact.label} className="about__fact">
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}