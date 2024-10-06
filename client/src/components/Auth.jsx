import { Link } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';

export default function Auth() {
  const { auth, logout, loginRef } = useAuth();

  if (!auth.isLoggedIn) {

    return (
      <>
        <div className="d-flex mt-5 mt-lg-0 ps-xl-5 align-items-center justify-content-center">
          <ul className="navbar-nav justify-content-end align-items-center">
            <li className="nav-item">
              <Link
                className="nav-link px-3"
                to="#"
                data-bs-toggle="modal"
                data-bs-target="#loginModal"
                ref={loginRef}
              >
                Login
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className="btn btn-outline-primary nav-button mx-3 text-white bg-dark text-nowrap"
            data-bs-toggle="modal"
            data-bs-target="#registerModal"
          >
            Sign up
          </button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <ul className="navbar-nav justify-content-end align-items-center fs-4">
          <li className="nav-item">
            <Link className="nav-link px-3" to="/profile">
              Profile
            </Link>
          </li>
        </ul>

        {auth.category === "passenger" && (<ul className="navbar-nav justify-content-end align-items-center fs-4">
          <li className="nav-item">
            <Link className="nav-link px-3" to="/deposit">
              Deposit
            </Link>
          </li>
        </ul>)}
        {auth.category === "driver" && (<ul className="navbar-nav justify-content-end align-items-center fs-4">
          <li className="nav-item">
            <Link className="nav-link px-3" to="/withDrawal">
              WithDrawal
            </Link>
          </li>
        </ul>)}

        <div className="navbar-nav justify-content-end align-items-center">
          <button
            type="button"
            onClick={logout}
            className="btn btn-outline-primary nav-button mx-3 text-white bg-dark text-nowrap"
          >
            Log out
          </button>
        </div>
      </>
    );
  }
}
