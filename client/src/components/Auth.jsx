import { useNavigate } from "react-router-dom";

export default function Auth({token, setToken}) {
  let navigateTo = useNavigate();
  const logOut = () => {
      localStorage.removeItem('token');
      setToken();
  }
  if (!token) {
      return (
        <>
            <div className="d-flex mt-5 mt-lg-0 ps-xl-5 align-items-center justify-content-center">
              <ul className="navbar-nav justify-content-end align-items-center">
                <li className="nav-item">
                  <a
                    className="nav-link px-3"
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#loginModal"
                  >
                    Login
                  </a>
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
              <ul className="navbar-nav justify-content-end align-items-center">
                <li className="nav-item">
                  <a
                    className="nav-link px-3"
                    href="#"
                  >
                    Profile
                  </a>
                </li>
              </ul>
              <button
                type="button"
                onClick={logOut}
                className="btn btn-outline-primary nav-button mx-3 text-white bg-dark text-nowrap"
              >
                Log out
              </button>
        </>
      );
  }
}
