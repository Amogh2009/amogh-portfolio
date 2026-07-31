import { Outlet } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default function Layout() {
  return (
    <div className="app">
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
