import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import blog3 from "../assets/imgs/blog3.jpg";
import blog2 from "../assets/imgs/blog2.jpg";


export default function About() {
  return (
    <>
      {/* hero section start  */}
      <section id="hero" className=" position-relative overflow-hidden">
        <div className=" container text-center py-5 mt-5">
          <div className="row my-5 ">
            <div className="d-flex flex-wrap flex-column justify-content-center align-items-center">
              <h2 className="page-title display-3 mt-5">ABOUT US</h2>
              <nav className="breadcrumb">
                <a className="breadcrumb-item" href="/">
                  Home
                </a>
                <span className="breadcrumb-item active" aria-current="page">
                  About Us
                </span>
              </nav>
              <p>
                Welcome to AirPick! We are a leading airport transportation
                service based in Espoo, Finland. Our mission is to provide
                convenient, safe, and comfortable rides to and from the airport
                for our clients. Whether you're traveling for business or
                pleasure, AirPick is here to ensure a smooth and stress-free
                journey.
              </p>
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
                    OUR<span className="text-primary"> STORY</span>
                  </h2>
                  <p>
                    Founded in Espoo, AirPick was born from a desire to make
                    airport travel more accessible and reliable for everyone.
                    We understand the challenges of airport transportation,
                    from navigating busy roads to ensuring timely pickups.
                    That’s why we strive to offer exceptional service, with a
                    focus on punctuality and customer satisfaction.
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
                    OUR
                    <span className="text-primary"> VALUES </span>
                  </h2>
                  <ul>
                    <li><strong>Reliability:</strong> Our clients trust us to be there when they need us. We value your time and make it our priority to provide timely services.</li>
                    <li><strong>Comfort:</strong> Traveling should be relaxing. With our modern vehicles and professional drivers, we ensure a comfortable ride every time.</li>
                    <li><strong>Customer Focus:</strong> We put our clients first and work hard to meet their needs. Your satisfaction is our success.</li>
                  </ul>
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
    </>
  );
}
