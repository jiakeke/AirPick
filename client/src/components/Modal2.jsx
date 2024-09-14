import { useState } from "react";

export default function Modal2() {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    password: "",
    confirmPassword: "",
    email: "",
    phone: "",
    category: "",
    balance: "",
  });

  const [emailValid, setEmailValid] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState(null);

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
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
    setPasswordStrength(validatePassword(value));
  };

  const signUp = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("log in OK");
    } else {
      console.log("log in error");
    }
  };

  const validateForm = () => {
    validateEmail(user.email);
    validatePassword(user.password);
    if (
      emailValid === true &&
      passwordStrength === true &&
      user.password === user.confirmPassword
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
        id="exampleModal2"
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
                      data-bs-target="#exampleModal"
                      type="button"
                    >
                      Log In
                    </button>
                    <button
                      className="btn btn-outline-primary text-uppercase active"
                      id="nav-register-tab"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal2"
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
                    {/*Form to write email*/}
                    <div className="form-input col-lg-12 my-4">
                      <label
                        htmlFor="exampleInputEmail4"
                        className="form-label fs-6 text-uppercase fw-bold text-black"
                      >
                        Email Address
                      </label>
                      <input
                        type="text"
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
                    </div>

                    {/*Form to select identity*/}
                    <div className="container text-center">
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
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
                          name="flexRadioDefault"
                          id="flexRadioDefault2"
                          defaultChecked=""
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
                      <input type="checkbox" required="" className="d-inline" />
                      <span className="label-body text-black">
                        I agree to the
                        <a
                          href="#"
                          className="text-black password border-bottom"
                        >
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                    <div className="d-grid my-3">
                      <button
                        type="button"
                        className="btn btn-primary btn-lg btn-dark text-uppercase btn-rounded-none fs-6"
                        onClick={signUp}
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
    </>
  );
}
