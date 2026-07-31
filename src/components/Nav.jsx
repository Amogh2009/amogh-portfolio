import { NavLink } from 'react-router-dom'

export default function Nav() {
  const links = [
    { label: 'Work', to: '/work' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ]

  return (
    <nav className="nav">
      <NavLink to="/" className="nav__logo">
        amogh<span className="accent">.</span>
      </NavLink>
      <div className="nav__links">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => (isActive ? 'nav__link--active' : undefined)}
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
