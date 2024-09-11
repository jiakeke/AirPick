export default function Modal() {
  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
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
                      data-bs-target="#exampleModal"
                      type="button"
                    >
                      Log In
                    </button>
                    <button
                      className="btn btn-outline-primary text-uppercase"
                      id="nav-register-tab"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal2"
                      type="button"
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
                    <form id="form1" className="form-group flex-wrap p-3">
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
                          className="form-label fs-6 text-uppercase fw-bold text-black"
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
                          <a href="#" className="password">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
