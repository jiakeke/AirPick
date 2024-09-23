import { useState } from "react";
import { useRef } from "react";
import axios from "axios";
import PrivacyPolicy from "./PrivacyPolicy";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService";

export default function Register({ setIsAuthed }) {
  const closeRef = useRef();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    password: "",
    confirmPassword: "",
    email: "",
    phone: "",
    category: "passenger",
    balance: "",
  });

  const [APIErrorMessage, setAPIErrorMessage] = useState("");
  const [emailValid, setEmailValid] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState(null);
  const [emailInvalidMessage, setemailInvalidMessage] = useState("");
  const [passwordInvalidMessage, setPasswordInvalidMessage] = useState("");
  const [confirmPasswordInvalidMessage, setConfirmPasswordInvalidMessage] =
    useState("");
  const [firstNameInvalidMessage, setFirstNameInvalidMessage] = useState("");
  const [lastNasmeInvalidMessage, setLastNasmeInvalidMessage] = useState("");

  const [policyChecked, setPolicyChecked] = useState(false);
  const [policyUncheckedMassage, setPolicyUncheckedMassage] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleFirstNameChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
    setFirstNameInvalidMessage("");
  };

  const handleLastNameChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
    setLastNasmeInvalidMessage("");
  };

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
    setEmailValid(validateEmail(value));
    setemailInvalidMessage("");
  };

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
    setPasswordStrength(validatePassword(value));
    setPasswordInvalidMessage("");
    setConfirmPasswordInvalidMessage("");
  };

  let navigateTo = useNavigate();

  const registerHandler = (e) => {
    if (validateForm()) {
      userService
        .userRegist({
          first_name: user.first_name,
          last_name: user.last_name,
          password: user.password,
          email: user.email,
          category: user.category,
        })
        .then((response) => {
          if (response.status != 201) {
            setAPIErrorMessage(response.data);
          } else {
            setAPIErrorMessage("");

            userService.userLogin({
              email: user.email,
              password: user.password,
              setIsAuthed: setIsAuthed,
            });
            closeRef.current.click();
            navigateTo("/");
          }
        });
    } else {
      console.log("Sign up error");
    }
  };

  const validateForm = () => {
    if (user.email === "") {
      setemailInvalidMessage("Please enter email.");
    }
    if (user.password === "") {
      setPasswordInvalidMessage("Please enter password.");
    }
    if (user.confirmPassword === "") {
      setConfirmPasswordInvalidMessage("Please enter password again.");
    }
    if (user.first_name === "") {
      setFirstNameInvalidMessage("First name required.");
    }
    if (user.last_name === "") {
      setLastNasmeInvalidMessage("Last name required.");
    }
    if (policyChecked === false) {
      setPolicyUncheckedMassage(
        <p style={{ margin: "0" }}>
          Please read and agree to the private policy.
        </p>
      );
    }
    validateEmail(user.email);
    validatePassword(user.password);
    if (emailValid === false) {
      setemailInvalidMessage("Email address is invalid.");
    }
    if (user.password !== user.confirmPassword) {
      setPasswordInvalidMessage("Password do not match.");
      setConfirmPasswordInvalidMessage("Password do not match.");
    }
    if (user.password === user.confirmPassword && passwordStrength === false) {
      setPasswordInvalidMessage("Password is too weak.");
      setConfirmPasswordInvalidMessage("Password is too weak.");
    }
    if (
      emailValid === true &&
      passwordStrength === true &&
      user.password === user.confirmPassword &&
      policyChecked === true
    ) {
      console.log("Validate OK");
      return true;
    } else {
      console.log("Validate Error");
      return false;
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="registerModal"
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
                    id="nav-tab2"
                    role="tablist"
                  >
                    <button
                      className="btn btn-outline-primary text-uppercase me-3"
                      id="nav-sign-in-tab"
                      data-bs-toggle="modal"
                      data-bs-target="#loginModal"
                      type="button"
                    >
                      Log In
                    </button>
                    <button
                      className="btn btn-outline-primary text-uppercase active"
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
                <div
                  className="tab-pane fade active show"
                  id="nav-register2"
                  role="tabpanel"
                  aria-labelledby="nav-register-tab2"
                >
                  <form id="form4" className="form-group flex-wrap p-3">
                    <div className="form-label">
                      <small style={{ color: "red" }}>{APIErrorMessage}</small>
                    </div>
                    <div className="form-label">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="input1"
                              className="fs-6 text-uppercase fw-bold text-black"
                            >
                              First Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="input1"
                              name="first_name"
                              placeholder="first name"
                              onChange={handleFirstNameChange}
                              style={{
                                borderColor:
                                  user.first_name === "" ? "" : "green",
                              }}
                            />
                            <small style={{ color: "red" }}>
                              {firstNameInvalidMessage}
                            </small>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="input2"
                              className="fs-6 text-uppercase fw-bold text-black"
                            >
                              Last Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="input2"
                              name="last_name"
                              placeholder="last name"
                              onChange={handleLastNameChange}
                              style={{
                                borderColor:
                                  user.last_name === "" ? "" : "green",
                              }}
                            />
                            <small style={{ color: "red" }}>
                              {lastNasmeInvalidMessage}
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/*Form to write email*/}
                    <div className="form-input col-lg-12 my-4">
                      <label
                        htmlFor="exampleInputEmail4"
                        className="form-label fs-6 text-uppercase fw-bold text-black"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="exampleInputEmail4"
                        name="email"
                        placeholder="Email"
                        className="form-control ps-3"
                        onChange={handleEmailChange}
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
                        htmlFor="inputPassword2"
                        className="form-label fs-6 text-uppercase fw-bold text-black"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="inputPassword2"
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
                    </div>
                    {/*Form to write confirm password*/}
                    <div className="form-input col-lg-12 my-4">
                      <label
                        htmlFor="inputPassword3"
                        className="form-label fs-6 text-uppercase fw-bold text-black"
                      >
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        id="inputPassword3"
                        name="confirmPassword"
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
                        {confirmPasswordInvalidMessage}
                      </small>
                    </div>

                    {/*Form to select identity*/}
                    <div className="container text-center">
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="category"
                          id="flexRadioDefault1"
                          defaultChecked="checked"
                          value="passenger"
                          onChange={handleCategoryChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault1"
                        >
                          I'm a passenger
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="category"
                          id="flexRadioDefault2"
                          value="driver"
                          onChange={handleCategoryChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault2"
                        >
                          I'm a driver
                        </label>
                      </div>
                    </div>

                    {/*Policy and other things, should be down to the bottom*/}
                    <label className="py-3">
                      <input
                        type="checkbox"
                        required=""
                        className="d-inline"
                        checked={policyChecked}
                        onChange={() => {
                          setPolicyChecked(!policyChecked);
                          setPolicyUncheckedMassage("");
                        }}
                      />
                      <span className="label-body text-black">
                        I agree to the &nbsp;
                        <a
                          href="#"
                          className="text-black password border-bottom"
                          data-bs-toggle="modal"
                          data-bs-target="#privacyPolicy"
                        >
                          Privacy Policy
                        </a>
                      </span>
                      <small style={{ color: "red" }}>
                        {policyUncheckedMassage}
                      </small>
                    </label>

                    <div className="d-grid my-3">
                      <button
                        type="button"
                        className="btn btn-primary btn-lg btn-dark text-uppercase btn-rounded-none fs-6"
                        onClick={registerHandler}
                      >
                        Sign Up
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PrivacyPolicy />
    </>
  );
}
