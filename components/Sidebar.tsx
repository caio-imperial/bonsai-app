import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="d-flex flex-column align-items-center px-3 pt-2 text-white min-vh-100 bg-dark">
      <Link
        href="/"
        className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <span className="fs-5 d-none d-sm-inline">Bonsai App</span>
      </Link>
      <ul
        className="nav nav-pills flex-column mb-auto align-items-start w-100 d-grid gap-2"
        id="menu"
      >
        <li className="nav-item flex-sm-fill text-sm-center ">
          <Link href="/" className={`nav-link link-light align-middle d-flex justify-content-center ${pathname === '/' ? 'active' : ''}`}>
            <i className="fs-4 bi-house"></i>
            <span className="ms-1 d-none d-sm-inline align-self-center">Meus bonsais</span>
          </Link>
        </li>
        <li className="nav-item flex-sm-fill text-sm-center">
          <Link href="/bonsais/new" className={`nav-link link-light align-middle d-flex justify-content-center ${pathname === '/bonsais/new' ? 'active' : ''}`}>
            <i className="fs-4 bi-plus"></i>{" "}
            <span className="ms-1 d-none d-sm-inline align-self-center">Novo bonsai</span>
          </Link>
        </li>
      </ul>
      <hr />
      <div className="dropdown pb-4 me-auto">
        <Link
          href="#"
          className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
          id="dropdownUser1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://github.com/mdo.png"
            alt="hugenerd"
            width="30"
            height="30"
            className="rounded-circle"
          />
          <span className="d-none d-sm-inline mx-1">loser</span>
        </Link>
        <ul
          className="dropdown-menu dropdown-menu-dark text-small shadow"
          aria-labelledby="dropdownUser1"
        >
          <li>
            <Link className="dropdown-item" href="#">
              New project...
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" href="#">
              Settings
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" href="#">
              Profile
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link className="dropdown-item" href="#">
              Sign out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
