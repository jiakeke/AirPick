import { useState } from "react";
import { useRef } from "react";
import userService from "../services/userService";
import { useNavigate } from "react-router-dom";

export default function Login({ setIsAuthed }) {
  const closeRef = useRef();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    password: "",
    email: "",
    phone: "",
    category: "",
    balance: "",
  });

  const [APIErrorMessage, setAPIErrorMessage] = useState("");
  const [emailValid, setEmailValid] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState(null);
  const [emailInvalidMessage, setemailInvalidMessage] = useState("");
  const [passwordInvalidMessage, setPasswordInvalidMessage] = useState("");
  const [rememberMeState, setRememberMeState] = useState(false);

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
    console.log(rememberMeState);
    if (rememberMeState) {
      localStorage.setItem("userEmail", JSON.stringify(user.email));
    } else {
      localStorage.removeItem("userEmail", JSON.stringify(user.email));
    }

    setEmailValid(validateEmail(value));
    setemailInvalidMessage("");
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
    setPasswordStrength(validatePassword(value));
    setPasswordInvalidMessage("");
  };

  let navigateTo = useNavigate();

  const loginHandler = (e) => {
    e.preventDefault();
    if (validateForm()) {
      userService
        .userLogin({
          email: user.email,
          password: user.password,
          setIsAuthed: setIsAuthed,
        })
        .then((response) => {
          if (response.status != 200) {
            setAPIErrorMessage(response.data);
          } else {
            setAPIErrorMessage("");
            closeRef.current.click();
            navigateTo("/");
          }
        });
    } else {
      console.log("log in error");
    }
  };

  const validateForm = () => {
    if (user.email === "") {
      setemailInvalidMessage("Please enter email.");
    }
    if (user.password === "") {
      setPasswordInvalidMessage("Please enter password.");
    }
    validateEmail(user.email);
    validatePassword(user.password);
    if (emailValid === true && passwordStrength === true) {
      console.log("Validate OK");
      return true;
    } else if (emailValid === false) {
      setemailInvalidMessage("Email invalid");
      return false;
    }
  };

  const handleRememberMe = () => {
    setRememberMeState(!rememberMeState);
    console.log(rememberMeState);
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
                          <a href="#" className="password">
                            Forgot Password ?
                          </a>
                        </div>
                      </div>

                      {/*other things, should be in botton*/}
                      <label className="py-3">
                        <input
                          type="checkbox"
                          required=""
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
