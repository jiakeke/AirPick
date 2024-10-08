import { useState } from "react";
import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import useAxios from "../axios";

export default function Login() {
  const { login } = useAuth();
  const api = useAxios();
  const navigateTo = useNavigate();
  const closeRef = useRef();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    password: "",
    email: JSON.parse(localStorage.getItem("userEmail")),
    phone: "",
    category: "",
    balance: "",
  });

  const [APIErrorMessage, setAPIErrorMessage] = useState("");
  const [emailValid, setEmailValid] = useState(
    JSON.parse(localStorage.getItem("userEmail")) ? true : false
  );
  const [passwordStrength, setPasswordStrength] = useState(null);
  const [emailInvalidMessage, setemailInvalidMessage] = useState("");
  const [passwordInvalidMessage, setPasswordInvalidMessage] = useState("");
  const [rememberMeState, setRememberMeState] = useState(
    JSON.parse(localStorage.getItem("userEmail")) ? true : false
  );

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
    setEmailValid(validateEmail(value));
    setemailInvalidMessage("");
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
    setPasswordStrength(validatePassword(value));
    setPasswordInvalidMessage("");
  };

  const loginHandler = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (rememberMeState) {
        localStorage.setItem("userEmail", JSON.stringify(user.email));
      } else {
        localStorage.removeItem("userEmail", JSON.stringify(user.email));
      }
      login({
        email: user.email,
        password: user.password,
        api,
      }).then((response) => {
        if (response.status != 200) {
          setAPIErrorMessage(response.data);
        } else {
          setAPIErrorMessage("");
          closeRef.current.click();
          navigateTo("/");
        }
      });

      return { user, setUser };
    } else {
      console.error("log in error");
    }
  };

  const validateForm = () => {
    if (user.email === "") {
      setemailInvalidMessage("Please enter email.");
    }
    if (user.password === "") {
      setPasswordInvalidMessage("Please enter password.");
    }
    setEmailValid(validateEmail(user.email));
    setPasswordStrength(validatePassword(user.password));
    if (emailValid === true && passwordStrength === true) {
      return true;
    } else if (emailValid === false) {
      setemailInvalidMessage("Email invalid");
      return false;
    } else {
      console.error("Validation Error");
    }
  };

  const handleRememberMe = () => {
    setRememberMeState(!rememberMeState);
  };

  return (
    <>
      <div
        className="modal fade"
        id="loginModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={closeRef}
              ></button>
            </div>
            <div className="modal-body">
              <div className="tabs-listing">
                {/*Log in and Sign up button uphead*/}
                <nav>
                  <div
                    className="nav nav-tabs d-flex justify-content-center border-0"
                    id="nav-tab"
                    role="tablist"
                  >
                    <button
                      className="btn btn-outline-primary text-uppercase me-3 active"
                      id="nav-sign-in-tab"
                      data-bs-toggle="modal"
                      data-bs-target="#loginModal"
                      type="button"
                    >
                      Log In
                    </button>
                    <button
                      className="btn btn-outline-primary text-uppercase"
                      id="nav-register-tab"
                      data-bs-toggle="modal"
                      data-bs-target="#registerModal"
                      type="button"
                    >
                      Sign Up
                    </button>
                  </div>
                </nav>
                {/*Log in and Sign up button uphead*/}

                {/*Sign up modal body*/}
                <div className="tab-content" id="nav-tabContent">
                  <div
                    className="tab-pane fade active show"
                    id="nav-sign-in"
                    role="tabpanel"
                    aria-labelledby="nav-sign-in-tab"
                  >
                    <form id="form1" className="form-group flex-wrap p-3">
                      {/*Form to write email*/}
                      <div className="form-label">
                        <small style={{ color: "red" }}>
                          {APIErrorMessage}
                        </small>
                      </div>
                      <div className="form-input col-lg-12 my-4">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label fs-6 text-uppercase fw-bold text-black"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="exampleInputEmail1"
                          name="email"
                          placeholder="Email"
                          className="form-control ps-3"
                          onChange={handleEmailChange}
                          defaultValue={JSON.parse(
                            localStorage.getItem("userEmail")
                          )}
                          style={{
                            borderColor:
                              emailValid === null
                                ? ""
                                : emailValid
                                ? "green"
                                : "red",
                          }}
                        />
                        <small style={{ color: "red" }}>
                          {emailInvalidMessage}
                        </small>
                      </div>
                      {/*Form to write password*/}
                      <div className="form-input col-lg-12 my-4">
                        <label
                          htmlFor="inputPassword1"
                          className="form-label fs-6 text-uppercase fw-bold text-black"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          id="inputPassword1"
                          name="password"
                          placeholder="Password"
                          className="form-control ps-3"
                          aria-describedby="passwordHelpBlock"
                          autoComplete="off"
                          onChange={handlePasswordChange}
                          style={{
                            borderColor:
                              passwordStrength === null
                                ? ""
                                : passwordStrength
                                ? "green"
                                : "red",
                          }}
                        />
                        <small style={{ color: "red" }}>
                          {passwordInvalidMessage}
                        </small>
                        <div
                          id="passwordHelpBlock"
                          className="form-text text-center"
                        >
                          <Link to="/forgot_password" onClick={() => closeRef.current.click()}>
                            Forgot Password?
                          </Link>
          
                        </div>
                      </div>

                      {/*other things, should be in botton*/}
                      <label className="py-3">
                        <input
                          type="checkbox"
                          required=""
                          checked={rememberMeState}
                          className="d-inline"
                          onChange={handleRememberMe}
                        />
                        &nbsp;
                        <span className="label-body text-black">
                          Remember Me
                        </span>
                      </label>
                      <div className="d-grid my-3">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg btn-dark text-uppercase btn-rounded-none fs-6"
                          onClick={loginHandler}
                        >
                          Log In
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
