export default function Nav() {
  const links = [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <nav className="nav">
      <a href="#top" className="nav__logo">
        amogh<span className="accent">.</span>
      </a>
      <div className="nav__links">
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  )
}