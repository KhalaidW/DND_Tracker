import { Link, NavLink } from "react-router-dom";
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container">
        <Link className="navbar-brand" to="/">
          D&D Tracker
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            {/* Home */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end>
                Home
              </NavLink>
            </li>

            {/* API Search Dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="apiDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                D&D Search
              </a>

              <ul className="dropdown-menu dropdown-menu-dark">
                <li>
                  <NavLink className="dropdown-item" to="/api-search/spells">
                    Spells
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/api-search/monsters">
                    Monsters
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/api-search/classes">
                    Classes
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/api-search/races">
                    Races
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/api-search/feats">
                    Feats
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/api-search/backgrounds">
                    Backgrounds
                  </NavLink>
                </li>
              </ul>
            </li>

            {/* Auth */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}