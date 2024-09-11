import "bootstrap/js/src/collapse.js";
import "bootstrap/js/dist/modal";
import "./nav.scss";
import classNames from "classnames";
import { useState } from "react";

import Modal from "./Modal";
import Modal2 from "./Modal2";

export default function Nav() {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <header className="navbar navbar-expand-lg bg-dark navbar-dark">
        <nav className="container">
          <a className="navbar-brand fs-3" href="#">
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
                <a className="nav-link px-3" href="#">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link px-3" href="#">
                  Service
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link px-3" href="#">
                  News
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link px-3" href="#">
                  Contact
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link px-3" href="#">
                  Router
                </a>
              </li>
            </ul>
            <div className="d-flex mt-5 mt-lg-0 ps-xl-5 align-items-center justify-content-center">
              <ul className="navbar-nav justify-content-end align-items-center">
                <li className="nav-item">
                  <a
                    className="nav-link px-3"
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Login
                  </a>
                </li>
              </ul>
              <button
                type="button"
                className="btn btn-outline-primary nav-button mx-3 text-white bg-dark text-nowrap"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal2"
              >
                Sign in
              </button>
            </div>
          </section>
        </nav>
        <Modal />
        <Modal2 />
      </header>
    </>
  );
}
