import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import "../assets/orders.css";

export default function Orders() {
  const orderlist = [
    {
      img: "",
      name: "",
      discription: "",
      url: "",
      h1: "",
      h2: "",
      h3: "",
      h4: "",
    },
    {
      img: "",
      name: "",
      discription: "",
      url: "",
      h1: "",
      h2: "",
      h3: "",
      h4: "",
    },
  ];

  return (
    <>
      <section className="find-job job-list section">
        <div className="container">
          <div className="single-head">
            {/*Start order list*/}
            {/* Single Job */}
            {orderlist.map((order, index) => (
              <>
                <div className="single-job">
                  <div className="job-image">
                    <img src="assets/images/jobs/img8.png" alt="#" />
                  </div>
                  <div className="job-content">
                    <h4>
                      <a href="job-details.html">Android Developer</a>
                    </h4>
                    <p>
                      We are looking for Enrollment Advisors who are looking to
                      take 30-35 appointments per week. All leads are
                      pre-scheduled.
                    </p>
                    <ul>
                      <li>
                        <i className="lni lni-website" />
                        <a href="#"> androidplex.com</a>
                      </li>
                      <li>
                        <i className="lni lni-dollar" /> $20k - $25k
                      </li>
                      <li>
                        <i className="lni lni-map-marker" /> Cupertino, USA
                      </li>
                    </ul>
                  </div>
                  <div className="job-button">
                    <ul>
                      <li>
                        <a href="job-details.html">Apply</a>
                      </li>
                      <li>
                        <span>Part Time</span>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* End Single Job */}
              </>
            ))}
          </div>
        </div>
        {/*End order list */}
      </section>
      {/* /End Find Job Area */}
    </>
  );
}
