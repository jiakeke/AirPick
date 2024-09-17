export default function () {
  return (
    <>
      {/* hero section start  */}
      <section id="hero" className=" position-relative overflow-hidden">
        <div className="pattern-overlay pattern-right position-absolute">
          <img src="" alt="pattern" />
        </div>
        <div className="pattern-overlay pattern-left position-absolute">
          <img src="" alt="pattern" />
        </div>
        <div className="container text-center py-5 mt-5">
          <div className="row my-5">
            <div className="d-flex flex-wrap flex-column justify-content-center align-items-center">
              <h2 className="page-title display-3 mt-5">Contact Us</h2>
              <nav className="breadcrumb">
                <a className="breadcrumb-item" href="/">
                  Home
                </a>
                <span className="breadcrumb-item active" aria-current="page">
                  Contact
                </span>
              </nav>
            </div>
          </div>
        </div>
      </section>
      <section className="contact-us-wrap py-5 mt-5">
        <div className="container">
          <div className="row">
            <div className="contact-info col-md-6">
              <h2 className="fs-3 text-uppercase mb-4">Contact information</h2>
              <p>
                Tortor dignissim convallis aenean et tortor at risus viverra
                adipiscing.
              </p>
              <div className="page-content">
                <div className="col-md-6">
                  <div className="content-box my-5">
                    <h5 className="element-title text-uppercase fs-6 fw-bold ">
                      Head Office
                    </h5>
                    <div className="contact-address">
                      <p>730 Glenstone Ave 65802, Springfield, US</p>
                    </div>
                    <div className="contact-number ">
                      <a href="#">+123 987 321 ,</a>
                      <a href="#">+123 123 654</a>
                    </div>
                    <div className="email-address">
                      <p>
                        <a href="#">gocar@domain.com</a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="content-box my-5">
                    <h5 className="element-title text-uppercase fs-6 fw-bold ">
                      Branch Office
                    </h5>
                    <div className="contact-address">
                      <p>730 Glenstone Ave 65802, Springfield, US</p>
                    </div>
                    <div className="contact-number ">
                      <a href="#">+123 987 321 ,</a>
                      <a href="#">+123 123 654</a>
                    </div>
                    <div className="email-address">
                      <p>
                        <a href="#">contact@yourcompany.com</a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="content-box my-5">
                    <h5 className="element-title text-uppercase fs-6 fw-bold ">
                      Social info
                    </h5>
                    <div className="social-links">
                      <ul className="list-unstyled d-flex gap-3 mt3 ">
                        <li>
                          <a href="#" className="text-secondary me-3 p-0">
                            <iconify-icon
                              icon="ri:facebook-fill"
                              className="social-icon "
                            />
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-secondary me-3 p-0">
                            <iconify-icon
                              icon="ri:instagram-line"
                              className="social-icon "
                            />
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-secondary me-3 p-0">
                            <iconify-icon
                              icon="ri:twitter-fill"
                              className="social-icon "
                            />
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-secondary me-3 p-0">
                            <iconify-icon
                              icon="ri:youtube-fill"
                              className="social-icon "
                            />
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-secondary me-3 p-0">
                            <iconify-icon
                              icon="ri:linkedin-fill"
                              className="social-icon "
                            />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="inquiry-item col-md-6">
              <h2 className="fs-3 text-uppercase mb-4">Got any questions?</h2>
              <p>Use the form below to get in touch with us.</p>
              <form id="form" className="form-group flex-wrap">
                <div className="form-input col-lg-12 d-flex mb-3">
                  <input
                    type="text"
                    name="email"
                    placeholder="Write Your Name Here"
                    className="form-control ps-3 me-3"
                  />
                  <input
                    type="text"
                    name="email"
                    placeholder="Write Your Email Here"
                    className="form-control ps-3"
                  />
                </div>
                <div className="col-lg-12 mb-3">
                  <input
                    type="text"
                    name="email"
                    placeholder="Phone Number"
                    className="form-control ps-3"
                  />
                </div>
                <div className="col-lg-12 mb-3">
                  <input
                    type="text"
                    name="email"
                    placeholder="Write Your Subject Here"
                    className="form-control ps-3"
                  />
                </div>
                <div className="col-lg-12 mb-3">
                  <textarea
                    placeholder="Write Your Message Here"
                    className="form-control ps-3"
                    rows={8}
                    defaultValue={""}
                  />
                </div>
                <div className="d-grid">
                  <button className="btn btn-primary btn-lg text-uppercase btn-rounded-none">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section className="contact-list pb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4 border-end">
              <div className="content-box ps-3 my-4">
                <h5 className="element-title text-uppercase">USA</h5>
                <div className="contact-address">
                  <p>730 Glenstone Ave 65802, Springfield, US</p>
                </div>
                <div className="contact-number">
                  <p>
                    <a href="#">+123 987 321 ,</a>
                    <a href="#">+123 123 654</a>
                  </p>
                </div>
                <div className="email-address">
                  <p>
                    <a href="#">gocar@domain.com</a>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 border-end">
              <div className="content-box ps-3 my-4">
                <h5 className="element-title text-uppercase">France</h5>
                <div className="contact-address">
                  <p>13 Rue Montmartre 75001, Paris, France</p>
                </div>
                <div className="contact-number">
                  <p>
                    <a href="#">+123 987 321 ,</a>
                    <a href="#">+123 123 654</a>
                  </p>
                </div>
                <div className="email-address">
                  <p>
                    <a href="#">gocar@domain.com</a>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="content-box ps-3 my-4">
                <h5 className="element-title text-uppercase">Office</h5>
                <div className="contact-address">
                  <p>18 Chapel Brow PR25 3NE, Leyland, UK</p>
                </div>
                <div className="contact-number">
                  <p>
                    <a href="#">+123 987 321 ,</a>
                    <a href="#">+123 123 654</a>
                  </p>
                </div>
                <div className="email-address">
                  <p>
                    <a href="#">gocar@domain.com</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* services section start  */}
      <section id="services">
        <div className="container  py-5 my-5">
          <div className="row py-5 ">
            <div className=" pb-5  col-10 col-sm-8 col-lg-6">
              <h2 className="">
                See <span className="text-primary">best services</span> for your
                solution{" "}
              </h2>
            </div>
            <div className=" pb-5  col-lg-6">
              <p className="pt-4">
                Vitae aliquam vestibulum elit adipiscing massa diam in
                dignissim. Risus tellus libero elementum aliquam etiam. Lectus
                adipiscing est auctor mi quisque nunc non vive adipiscing massa
                diam in digniss imrra est.{" "}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="service-2">
        <div className=" services-sub container mb-5 pb-5">
          <div className="row">
            <div className=" mt-4 col-6 col-lg-3">
              <div className="services-components text-center pt-4 pb-3">
                <iconify-icon
                  className="services-icon my-2"
                  icon="solar:shield-check-outline"
                />
                <h5>Secured Payment</h5>
                <p>
                  Aliquam etiam lectus adipiscing est auctor mi quisque non.
                </p>
              </div>
            </div>
            <div className=" mt-4 col-6 col-lg-3">
              <div className="services-components text-center pt-4 pb-3">
                <iconify-icon
                  className="services-icon my-2"
                  icon="solar:bookmark-opened-outline"
                />
                <h5>any class vehicle</h5>
                <p>
                  Aliquam etiam lectus adipiscing est auctor mi quisque non.
                </p>
              </div>
            </div>
            <div className=" mt-4 col-6 col-lg-3">
              <div className="services-components text-center pt-4 pb-3">
                <iconify-icon
                  className="services-icon my-2"
                  icon="solar:user-circle-outline"
                />
                <h5>Car sharing options</h5>
                <p>
                  Aliquam etiam lectus adipiscing est auctor mi quisque non.
                </p>
              </div>
            </div>
            <div className=" mt-4 col-6 col-lg-3">
              <div className="services-components text-center pt-4 pb-3">
                <iconify-icon
                  className="services-icon my-2"
                  icon="solar:call-chat-outline"
                />
                <h5>Help center &amp; Support</h5>
                <p>
                  Aliquam etiam lectus adipiscing est auctor mi quisque non.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
