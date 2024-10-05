import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import blog3 from "../assets/imgs/blog3.jpg";
import blog2 from "../assets/imgs/blog2.jpg";

import Donate from "./Donate";

export default function About() {
  return (
    <>
      {/* hero section start  */}
      <section id="hero" className=" position-relative overflow-hidden">
        <div className=" container text-center py-5 mt-5">
          <div className="row my-5 ">
            <div className="d-flex flex-wrap flex-column justify-content-center align-items-center">
              <h2 className="page-title display-3 mt-5">About Us</h2>
              <nav className="breadcrumb">
                <a className="breadcrumb-item" href="/">
                  Home
                </a>
                <span className="breadcrumb-item active" aria-current="page">
                  About Us
                </span>
              </nav>
            </div>
          </div>
        </div>
      </section>
      <section id="about-us" className="my-5 py-5">
        <div className="vertical-element">
          <div className="container">
            <div className="row d-flex align-items-center">
              <div className="col-md-5">
                <div className="image-holder">
                  <img src={blog3} alt="about-us" className="img-fluid" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="section-element ps-0 p-5">
                  <h2 className="mb-3">
                    Who are <span className="text-primary"> we? </span>
                  </h2>
                  <p>
                    The beginning of our journey vel tellus Turpis purus,
                    gravida orci, fringilla a. Ac sed eu fringilla odio mi.
                    Consequat pharetra at magna imperdiet cursus ac faucibus sit
                    libero. Ultricies quam nunc, lorem sit lorem urna, pretium
                    aliquam ut. In vel, quis donec dolor id in. Pulvinar commodo
                    mollis diam sed facilisis at magna imperdiet cursus ac
                    faucibus sit libero.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="vertical-element mt-5 py-5">
          <div className="container">
            <div className="row d-flex align-items-center justify-content-between">
              <div className="col-md-6">
                <div className="section-element ps-0 p-5">
                  <h2 className="mb-3">
                    Choose us for
                    <span className="text-primary"> best services </span>
                  </h2>
                  <p>
                    We are nunc, lorem sit lorem urna, pretium aliquam ut. In
                    vel, quis donec dolor id in. Pulvinar commodo mollis diam
                    sed facilisis at magna imperdiet cursus ac faucibus sit
                    libero. Dignissim lacus, turpis ut suspendisse vel tellus.
                    Turpis purus, gravida orci, fringilla a. Ac sed eu fringilla
                    odio mi. Consequat pharetra at magna imperdiet cursus ac
                    faucibus sit libero.
                  </p>
                </div>
              </div>
              <div className="col-md-5">
                <div className="image-holder">
                  <img src={blog2} alt="about-us" className="img-fluid" />
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
                solution
              </h2>
            </div>
            <div className=" pb-5  col-lg-6">
              <p className="pt-4">
                Vitae aliquam vestibulum elit adipiscing massa diam in
                dignissim. Risus tellus libero elementum aliquam etiam. Lectus
                adipiscing est auctor mi quisque nunc non vive adipiscing massa
                diam in digniss imrra est.
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
      {/* call-to-action section start  */}
      <section id="action" className="position-relative">
        <div className="container  py-5 my-5">
          <div className="row py-5 ">
            <div className=" col-10 col-sm-8 col-lg-6">
              <h2 className="">
                Let’s begin with
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
      <section id="donate" className="position-relative">
        <Donate />
      </section>
    </>
  );
}
