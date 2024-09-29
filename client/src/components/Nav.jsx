import "bootstrap/js/src/collapse.js";
import "../assets/nav.scss";
import classNames from "classnames";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
          <a className="navbar-brand fs-3" href="/">
            AirPick
          </a>
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
                <a className="nav-link px-3" href="/about">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link px-3" href="/service">
                  Service
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link px-3" href="/news">
                  News
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link px-3" href="/contact">
                  Contact
                </a>
              </li>
            </ul>
            <Auth />
          </section>
        </nav>
      </header>
      <Login />
      <Register />
    </>
  );
}
