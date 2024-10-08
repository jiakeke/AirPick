export default function () {
  return (
    <>
      {/* hero section start  */}
      <section id="hero" className=" position-relative overflow-hidden">
        <div className="container text-center py-5 mt-5">
          <div className="row my-5">
            <div className="d-flex flex-wrap flex-column justify-content-center align-items-center">
              <h2 className="page-title display-3 mt-5">CONTACT US</h2>
              <nav className="breadcrumb">
                <a className="breadcrumb-item" href="/">
                  Home
                </a>
                <span className="breadcrumb-item active" aria-current="page">
                  Contact
                </span>
              </nav>
              <p>
                We're here to help! Whether you have questions about our
                services, need to make a booking, or require assistance, our
                team is just a message away.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="contact-us-wrap py-5 mt-5">
        <div className="container">
          <div className="row">
            <div className="contact-info col-md-6">
              <h2 className="fs-3 text-uppercase mb-4">Contact information</h2>
              <div className="page-content">
                <div className="col-md-6">
                  <div className="content-box my-5">
                    <h5 className="element-title text-uppercase fs-6 fw-bold ">
                      Head Office
                    </h5>
                    <div className="contact-address">
                      <p>Kalevalantie 8, 02130 Espoo, Finland</p>
                    </div>
                    <div className="contact-number ">
                      <a href="#">+358 61 888 8888</a><br />
                      <a href="#">+358 61 666 6666</a>
                    </div>
                    <div className="email-address">
                      <p>
                        <a href="#">airpick@airpick.com</a>
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
                      <a href="#">+123 987 321</a><br />
                      <a href="#">+123 123 654</a>
                    </div>
                    <div className="email-address">
                      <p>
                        <a href="#">us@airpick.com</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="inquiry-item col-md-6">
              <h2 className="fs-3 text-uppercase mb-4">Office Hours</h2>
              <p>Our office is open during the following hours:</p>
              <div className="page-content">
                <div className="col-md-6">
                  <div className="content-box my-5">
                    <div className="contact-address">
                      <p>Mon. -- Fri.: 8:00 AM - 6:00 PM</p>
                      <p>Sat.: 9:00 AM - 4:00 PM</p>
                      <p>Sun.: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
