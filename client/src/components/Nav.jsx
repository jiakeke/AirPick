import "bootstrap/js/src/collapse.js";
import "../assets/nav.scss";
import classNames from "classnames";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Auth from "./Auth.jsx";

import Login from "./Login";
import Register from "./Register";

export default function Nav() {
  const [isActive, setIsActive] = useState(false);
  let navigateTo = useNavigate();

  return (
    <>
      <header className="navbar navbar-expand-lg bg-dark navbar-dark fixed-top">
        <nav className="container">
          <Link className="navbar-brand fs-3" to="/">
            AirPick
          </Link>
          <button
            className="navbar-toggler boder-warning boder-2"
            onClick={() => setIsActive(!isActive)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <section
            className={classNames("navbar-collapse", "offcanvas-collapse", {
              active: isActive,
            })}
          >
            <ul className="navbar-nav me-auto text-center fs-4">
              <li className="nav-item">
                <Link className="nav-link px-3" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link px-3" to="/service">
                  Service
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link px-3" to="/news">
                  News
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link px-3" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
            <Linkuth />
          </section>
        </nav>
      </header>
      <Login />
      <Register />
    </>
  );
}
