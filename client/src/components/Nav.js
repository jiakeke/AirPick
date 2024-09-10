import logo from "../images/logo.png";

const Nav = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg  navbar-light container-fluid py-3 position-fixed ">
        <div className="container">
          <a className="navbar-brand" href="index.html">
            <img src={logo} alt="logo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabIndex={-1}
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                Menu
              </h5>
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              />
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav align-items-center justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <a
                    className="nav-link active px-3"
                    aria-current="page"
                    href="#"
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link px-3" href="#rental">
                    Cars
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link px-3" href="#pricing">
                    Pricing
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link px-3" href="#services">
                    Services
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link px-3" href="#blog">
                    Blog
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link px-3" href="#action">
                    Contact
                  </a>
                </li>
                <li className="nav-item dropdown text-center">
                  <a
                    className="nav-link px-3 dropdown-toggle"
                    data-bs-toggle="dropdown"
                    href="#"
                    role="button"
                    aria-expanded="false"
                  >
                    Pages{" "}
                    <iconify-icon icon="material-symbols:arrow-drop-down" />
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a
                        href="about.html"
                        className="dropdown-item text-uppercase "
                      >
                        About <span className="badge bg-secondary">Pro</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="blog.html"
                        className="dropdown-item text-uppercase "
                      >
                        Blog <span className="badge bg-secondary">Pro</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="single-post.html"
                        className="dropdown-item text-uppercase "
                      >
                        single-post{" "}
                        <span className="badge bg-secondary">Pro</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="cars.html"
                        className="dropdown-item text-uppercase "
                      >
                        Cars <span className="badge bg-secondary">Pro</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="car-single.html"
                        className="dropdown-item text-uppercase "
                      >
                        Car-Single
                        <span className="badge bg-secondary">Pro</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="booking.html"
                        className="dropdown-item text-uppercase "
                      >
                        Booking <span className="badge bg-secondary">Pro</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="services.html"
                        className="dropdown-item text-uppercase "
                      >
                        Services <span className="badge bg-secondary">Pro</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="pricing.html"
                        className="dropdown-item text-uppercase "
                      >
                        Pricing <span className="badge bg-secondary">Pro</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="contact.html"
                        className="dropdown-item text-uppercase "
                      >
                        Contact <span className="badge bg-secondary">Pro</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="team.html"
                        className="dropdown-item text-uppercase "
                      >
                        Team <span className="badge bg-secondary">Pro</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="review.html"
                        className="dropdown-item text-uppercase "
                      >
                        Reviews <span className="badge bg-secondary">Pro</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="faq.html"
                        className="dropdown-item text-uppercase "
                      >
                        FAQs <span className="badge bg-secondary">Pro</span>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
              <div className="d-flex mt-5 mt-lg-0 ps-xl-5 align-items-center justify-content-center ">
                <ul className="navbar-nav justify-content-end align-items-center">
                  <li className="nav-item">
                    <a
                      className="nav-link px-3"
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      Login{" "}
                    </a>
                  </li>
                  {/* Modal */}
                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex={-1}
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
                          />
                        </div>
                        <div className="modal-body">
                          <div className="tabs-listing">
                            <nav>
                              <div
                                className="nav nav-tabs d-flex justify-content-center border-0"
                                id="nav-tab"
                                role="tablist"
                              >
                                <button
                                  className="btn btn-outline-primary text-uppercase me-3 active"
                                  id="nav-sign-in-tab"
                                  data-bs-toggle="tab"
                                  data-bs-target="#nav-sign-in"
                                  type="button"
                                  role="tab"
                                  aria-controls="nav-sign-in"
                                  aria-selected="true"
                                >
                                  Log In
                                </button>
                                <button
                                  className="btn btn-outline-primary text-uppercase"
                                  id="nav-register-tab"
                                  data-bs-toggle="tab"
                                  data-bs-target="#nav-register"
                                  type="button"
                                  role="tab"
                                  aria-controls="nav-register"
                                  aria-selected="false"
                                >
                                  Sign Up
                                </button>
                              </div>
                            </nav>
                            <div className="tab-content" id="nav-tabContent">
                              <div
                                className="tab-pane fade active show"
                                id="nav-sign-in"
                                role="tabpanel"
                                aria-labelledby="nav-sign-in-tab"
                              >
                                <form
                                  id="form1"
                                  className="form-group flex-wrap p-3 "
                                >
                                  <div className="form-input col-lg-12 my-4">
                                    <label
                                      htmlFor="exampleInputEmail1"
                                      className="form-label fs-6 text-uppercase fw-bold text-black"
                                    >
                                      Email Address
                                    </label>
                                    <input
                                      type="text"
                                      id="exampleInputEmail1"
                                      name="email"
                                      placeholder="Email"
                                      className="form-control ps-3"
                                    />
                                  </div>
                                  <div className="form-input col-lg-12 my-4">
                                    <label
                                      htmlFor="inputPassword1"
                                      className="form-label  fs-6 text-uppercase fw-bold text-black"
                                    >
                                      Password
                                    </label>
                                    <input
                                      type="password"
                                      id="inputPassword1"
                                      placeholder="Password"
                                      className="form-control ps-3"
                                      aria-describedby="passwordHelpBlock"
                                    />
                                    <div
                                      id="passwordHelpBlock"
                                      className="form-text text-center"
                                    >
                                      <a href="#" className=" password">
                                        Forgot Password ?
                                      </a>
                                    </div>
                                  </div>
                                  <label className="py-3">
                                    <input
                                      type="checkbox"
                                      required=""
                                      className="d-inline"
                                    />
                                    <span className="label-body text-black">
                                      Remember Me
                                    </span>
                                  </label>
                                  <div className="d-grid my-3">
                                    <button className="btn btn-primary btn-lg btn-dark text-uppercase btn-rounded-none fs-6">
                                      Log In
                                    </button>
                                  </div>
                                </form>
                              </div>
                              <div
                                className="tab-pane fade"
                                id="nav-register"
                                role="tabpanel"
                                aria-labelledby="nav-register-tab"
                              >
                                <form
                                  id="form2"
                                  className="form-group flex-wrap p-3 "
                                >
                                  <div className="form-input col-lg-12 my-4">
                                    <label
                                      htmlFor="exampleInputEmail2"
                                      className="form-label fs-6 text-uppercase fw-bold text-black"
                                    >
                                      Email Address
                                    </label>
                                    <input
                                      type="text"
                                      id="exampleInputEmail2"
                                      name="email"
                                      placeholder="Email"
                                      className="form-control ps-3"
                                    />
                                  </div>
                                  <div className="form-input col-lg-12 my-4">
                                    <label
                                      htmlFor="inputPassword2"
                                      className="form-label  fs-6 text-uppercase fw-bold text-black"
                                    >
                                      Password
                                    </label>
                                    <input
                                      type="password"
                                      id="inputPassword2"
                                      placeholder="Password"
                                      className="form-control ps-3"
                                      aria-describedby="passwordHelpBlock"
                                    />
                                  </div>
                                  <label className="py-3">
                                    <input
                                      type="checkbox"
                                      required=""
                                      className="d-inline"
                                    />
                                    <span className="label-body text-black">
                                      I agree to the{" "}
                                      <a
                                        href="#"
                                        className="text-black password border-bottom"
                                      >
                                        Privacy Policy
                                      </a>
                                    </span>
                                  </label>
                                  <div className="d-grid my-3">
                                    <button className="btn btn-primary btn-lg btn-dark text-uppercase btn-rounded-none fs-6">
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
                  </div>
                </ul>
                <button
                  type="button"
                  className="btn btn-outline-primary nav-button mx-3"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal2"
                >
                  {" "}
                  Sign in{" "}
                </button>
                {/* Modal */}
                <div
                  className="modal fade"
                  id="exampleModal2"
                  tabIndex={-1}
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
                        />
                      </div>
                      <div className="modal-body">
                        <div className="tabs-listing">
                          <nav>
                            <div
                              className="nav nav-tabs d-flex justify-content-center border-0"
                              id="nav-tab2"
                              role="tablist"
                            >
                              <button
                                className="btn btn-outline-primary text-uppercase me-4 "
                                id="nav-sign-in-tab2"
                                data-bs-toggle="tab"
                                data-bs-target="#nav-sign-in2"
                                type="button"
                                role="tab"
                                aria-controls="nav-sign-in2"
                                aria-selected="false"
                              >
                                Log In
                              </button>
                              <button
                                className="btn btn-outline-primary text-uppercase active"
                                id="nav-register-tab2"
                                data-bs-toggle="tab"
                                data-bs-target="#nav-register2"
                                type="button"
                                role="tab"
                                aria-controls="nav-register2"
                                aria-selected="true"
                              >
                                Sign Up
                              </button>
                            </div>
                          </nav>
                          <div className="tab-content" id="nav-tabContent1">
                            <div
                              className="tab-pane fade "
                              id="nav-sign-in2"
                              role="tabpanel"
                              aria-labelledby="nav-sign-in-tab2"
                            >
                              <form
                                id="form3"
                                className="form-group flex-wrap p-3 "
                              >
                                <div className="form-input col-lg-12 my-4">
                                  <label
                                    htmlFor="exampleInputEmail3"
                                    className="form-label fs-6 text-uppercase fw-bold text-black"
                                  >
                                    Email Address
                                  </label>
                                  <input
                                    type="text"
                                    id="exampleInputEmail3"
                                    name="email"
                                    placeholder="Email"
                                    className="form-control ps-3"
                                  />
                                </div>
                                <div className="form-input col-lg-12 my-4">
                                  <label
                                    htmlFor="inputPassword3"
                                    className="form-label  fs-6 text-uppercase fw-bold text-black"
                                  >
                                    Password
                                  </label>
                                  <input
                                    type="password"
                                    id="inputPassword3"
                                    placeholder="Password"
                                    className="form-control ps-3"
                                    aria-describedby="passwordHelpBlock"
                                  />
                                  <div
                                    id="passwordHelpBlock2"
                                    className="form-text text-center"
                                  >
                                    <a href="#" className=" password">
                                      Forgot Password ?
                                    </a>
                                  </div>
                                </div>
                                <label className="py-3">
                                  <input
                                    type="checkbox"
                                    required=""
                                    className="d-inline"
                                  />
                                  <span className="label-body text-black">
                                    Remember Me
                                  </span>
                                </label>
                                <div className="d-grid my-3">
                                  <button className="btn btn-primary btn-lg btn-dark text-uppercase btn-rounded-none fs-6">
                                    Log In
                                  </button>
                                </div>
                              </form>
                            </div>
                            <div
                              className="tab-pane fade active show"
                              id="nav-register2"
                              role="tabpanel"
                              aria-labelledby="nav-register-tab2"
                            >
                              <form
                                id="form4"
                                className="form-group flex-wrap p-3 "
                              >
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
                                  />
                                </div>
                                <div className="form-input col-lg-12 my-4">
                                  <label
                                    htmlFor="inputPassword4"
                                    className="form-label  fs-6 text-uppercase fw-bold text-black"
                                  >
                                    Password
                                  </label>
                                  <input
                                    type="password"
                                    id="inputPassword4"
                                    placeholder="Password"
                                    className="form-control ps-3"
                                    aria-describedby="passwordHelpBlock"
                                  />
                                </div>
                                <label className="py-3">
                                  <input
                                    type="checkbox"
                                    required=""
                                    className="d-inline"
                                  />
                                  <span className="label-body text-black">
                                    I agree to the{" "}
                                    <a
                                      href="#"
                                      className="text-black password border-bottom"
                                    >
                                      Privacy Policy
                                    </a>
                                  </span>
                                </label>
                                <div className="d-grid my-3">
                                  <button className="btn btn-primary btn-lg btn-dark text-uppercase btn-rounded-none fs-6">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
