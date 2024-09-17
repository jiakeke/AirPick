export default function () {
  return (
    <>
      {/* hero section start  */}
      <section id="hero" className=" position-relative overflow-hidden">
        <div className="container text-center py-5 mt-5">
          <div className="row my-5">
            <div className="d-flex flex-wrap flex-column justify-content-center align-items-center">
              <h2 className="page-title display-3 mt-5">Services</h2>
              <nav className="breadcrumb">
                <a className="breadcrumb-item" href="/">
                  Home
                </a>
                <span className="breadcrumb-item active" aria-current="page">
                  Services
                </span>
              </nav>
            </div>
          </div>
        </div>
      </section>
      {/* services section start  */}
      <section id="service-2">
        <div className=" container mb-5 pb-5">
          <h2 className="text-center my-5 pt-5">
            See <span className="text-primary">best services</span> for your
            solution
          </h2>
          <div className="row">
            <div className=" mt-4 col-md-4 ">
              <div className="services-components text-center p-5">
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
            <div className=" mt-4 col-md-4 ">
              <div className="services-components text-center p-5">
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
            <div className=" mt-4 col-md-4 ">
              <div className="services-components text-center p-5">
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
            <div className=" mt-4 col-md-4 ">
              <div className="services-components text-center p-5">
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
            <div className=" mt-4 col-md-4 ">
              <div className="services-components text-center p-5">
                <iconify-icon className="services-icon my-2" icon="ph:star" />
                <h5>Best price Guarantee</h5>
                <p>
                  Aliquam etiam lectus adipiscing est auctor mi quisque non.
                </p>
              </div>
            </div>
            <div className=" mt-4 col-md-4 ">
              <div className="services-components text-center p-5">
                <iconify-icon className="services-icon my-2" icon="bi:person" />
                <h5>Personal Driver</h5>
                <p>
                  Aliquam etiam lectus adipiscing est auctor mi quisque non.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* testimonial section start  */}
      <section id="testimonial" className=" position-relative">
        <div className="container my-5 py-5">
          <div className="swiper testimonial-swiper">
            <div className="swiper-wrapper">
              <div className="swiper-slide text-center">
                <div className="offset-2 col-8">
                  <iconify-icon
                    icon="mdi:format-quote-open"
                    className="testimonial-icon"
                  />
                  <p className="testimonial-paragraph">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.The
                    more content you provide about you. Quos saepe suscipit,
                    nemo dolore sapiente!
                  </p>
                  <h5>James Rodrigo</h5>
                </div>
              </div>
              <div className="swiper-slide text-center">
                <div className="offset-2 col-8">
                  <iconify-icon
                    icon="mdi:format-quote-open"
                    className="testimonial-icon"
                  />
                  <p className="testimonial-paragraph">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.The
                    more content you provide about you. Quos saepe suscipit,
                    nemo dolore sapiente!
                  </p>
                  <h5>James Rodrigo</h5>
                </div>
              </div>
              <div className="swiper-slide text-center">
                <div className="offset-2 col-8">
                  <iconify-icon
                    icon="mdi:format-quote-open"
                    className="testimonial-icon"
                  />
                  <p className="testimonial-paragraph">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.The
                    more content you provide about you. Quos saepe suscipit,
                    nemo dolore sapiente!
                  </p>
                  <h5>James Rodrigo</h5>
                </div>
              </div>
              <div className="swiper-slide text-center">
                <div className="offset-2 col-8">
                  <iconify-icon
                    icon="mdi:format-quote-open"
                    className="testimonial-icon"
                  />
                  <p className="testimonial-paragraph">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.The
                    more content you provide about you. Quos saepe suscipit,
                    nemo dolore sapiente!
                  </p>
                  <h5>James Rodrigo</h5>
                </div>
              </div>
            </div>
            <div className="swiper-pagination position-unset mt-4" />
          </div>
        </div>
      </section>
      {/* pricing section start  */}
      <section id="pricing">
        <div className=" container  py-5 my-5">
          <h2 className=" text-center my-5">
            See our <span className="text-primary">pricing plan</span>
          </h2>
          <div className="d-flex justify-content-center">
            <label className="pt-2" id="monthly-label">
              Monthly
            </label>
            <span className="form-check form-switch p-0">
              <input
                className="form-check-input mx-2"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckChecked"
                defaultChecked=""
              />
              <label
                className="pt-2"
                id="yearly-label"
                htmlFor="flexSwitchCheckChecked"
              >
                Yearly
              </label>
            </span>
          </div>
          <div className="row py-4">
            <div className="  col-lg-3 col-sm-6 col-12 pb-4">
              <div className=" pricing-lable pt-5 ">
                <div className="pt-3 ps-2">
                  <h3>Save by choosing our best plan</h3>
                  <p>Choose our best plan to save a lot.</p>
                </div>
                <iconify-icon
                  className="pricing-lable-icon "
                  icon="fluent:vehicle-car-profile-ltr-20-regular"
                />
              </div>
            </div>
            <div className=" col-lg-3 col-sm-6 col-12 pb-4">
              <div className=" pricing-detail py-5  text-center">
                <div className="pricing-content">
                  <h5>Essential</h5>
                  <div className="content monthly pt-2">
                    <h3>$29.50</h3>
                  </div>
                  <div className="content yearly pt-2">
                    <h3>$350.70</h3>
                  </div>
                  <div className="pt-4">
                    <p>✓ Quisque rhoncus</p>
                    <p>✓ Lorem ipsum dolor</p>
                    <p>✓ Vivamus velit mir</p>
                    <p>✓ Velit mir</p>
                    <p>✓ Elit mir ivamus</p>
                  </div>
                </div>
                <div className="pricing-button">
                  <button className="btn btn-primary">Choose Plan </button>
                </div>
              </div>
            </div>
            <div className=" col-lg-3 col-sm-6 col-12 pb-4">
              <div className=" pricing-detail py-5  text-center">
                <div className="pricing-content">
                  <h5 className="price-recommend">Recommended</h5>
                  <div className="content monthly pt-2">
                    <h3>$44.40</h3>
                  </div>
                  <div className="content yearly pt-2">
                    <h3>$530.60</h3>
                  </div>
                  <div className="pt-4">
                    <p>✓ Quisque rhoncus</p>
                    <p>✓ Lorem ipsum dolor</p>
                    <p>✓ Vivamus velit mir</p>
                    <p>✓ Elit mir ivamus</p>
                    <p>✓ Lorem ipsum dolor</p>
                    <p>✓ Ipsum dolor</p>
                  </div>
                </div>
                <div className="pricing-button">
                  <button className="btn btn-primary active">
                    Choose Plan
                  </button>
                </div>
              </div>
            </div>
            <div className=" col-lg-3 col-sm-6 col-12 pb-4">
              <div className=" pricing-detail py-5  text-center">
                <div className="pricing-content">
                  <h5>Pro</h5>
                  <div className="content monthly pt-2">
                    <h3>$70.50</h3>
                  </div>
                  <div className="content yearly pt-2">
                    <h3>$840.30</h3>
                  </div>
                  <div className="pt-4">
                    <p>✓ Quisque rhoncus</p>
                    <p>✓ Lorem ipsum dolor</p>
                    <p>✓ Vivamus velit mir</p>
                    <p>✓ Elit mir ivamus</p>
                    <p>✓ Ivamus mir vamus</p>
                    <p>✓ Quisque rhoncusr</p>
                    <p>✓ lit mir iamus</p>
                  </div>
                </div>
                <div className="pricing-button">
                  <button className="btn btn-primary">Choose Plan </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* call-to-action section start  */}
      <section id="action" className="position-relative">
        <div className="container  py-5 my-5">
          <div className="row py-5 ">
            <div className=" col-10 col-sm-8 col-lg-6">
              <h2 className="">
                Let's begin with
                <span className="text-primary">GoCar rental.</span>
              </h2>
            </div>
            <div className=" col-lg-6">
              <p>
                Neque, vestibulum sed varius magna et at. Eu, adipiscing morbi
                augue justo. Nibh laoreet volutpat quis velit. Blandit aliquam
                donec sed morbi congue eget lorem viverra porta id lobortis.
              </p>
              <a href="contact.html" className="btn btn-primary mt-2">
                Contact us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
