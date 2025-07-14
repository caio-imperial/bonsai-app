import Link from 'next/link'

export default function NavBar() {
  return (
    <nav className="navbar bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">
          🌱 Bonsai App
        </Link>
      </div>
    </nav>
  )
}
