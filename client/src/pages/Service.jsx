export default function () {
  return (
    <>
      {/* hero section start  */}
      <section id="hero" className=" position-relative overflow-hidden">
        <div className="container text-center py-5 mt-5">
          <div className="row my-5">
            <div className="d-flex flex-wrap flex-column justify-content-center align-items-center">
              <h2 className="page-title display-3 mt-5">SERVICES</h2>
              <nav className="breadcrumb">
                <a className="breadcrumb-item" href="/">
                  Home
                </a>
                <span className="breadcrumb-item active" aria-current="page">
                  Services
                </span>
              </nav>
              <p>
                At AirPick, we offer a variety of services to meet your airport
                transportation needs in the Espoo and greater Helsinki area.
                Our services are tailored to provide a seamless experience, no
                matter your destination or schedule.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* services section start  */}
      <section id="service-2">
        <div className=" container mb-5 pb-5">
          <h2 className="text-center my-5 pt-5">
            BEST <span className="text-primary">SERVICES</span>
          </h2>
          <div className="row">
            <div className=" mt-4 col-md-4 ">
              <div className="services-components text-center p-5">
                <iconify-icon
                  className="services-icon my-2"
                  icon="solar:shield-check-outline"
                />
                <h5>Airport Transfers</h5>
                <p>
                  We provide prompt and reliable airport transfers to and from
                  all major airports in Finland. Our drivers are experienced
                  and knowledgeable, ensuring a smooth journey that starts or
                  ends your trip on the right note.
                </p>
              </div>
            </div>
            <div className=" mt-4 col-md-4 ">
              <div className="services-components text-center p-5">
                <iconify-icon
                  className="services-icon my-2"
                  icon="solar:bookmark-opened-outline"
                />
                <h5>Private Chauffeur Services</h5>
                <p>
                  Need transportation for special events or business meetings?
                  Our private chauffeur services offer a comfortable and
                  professional ride, customized to your specific needs. Enjoy a
                  stress-free experience with AirPick.
                </p>
              </div>
            </div>
            <div className=" mt-4 col-md-4 ">
              <div className="services-components text-center p-5">
                <iconify-icon
                  className="services-icon my-2"
                  icon="solar:user-circle-outline"
                />
                <h5>Corporate Travel Solutions</h5>
                <p>
                  We understand the unique needs of corporate clients and offer
                  tailored travel solutions for business professionals. From
                  individual airport transfers to group transportation, our
                  services are designed to accommodate your business travel
                  requirements.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* pricing section start  */}
      <section id="pricing">
        <div className=" container  py-5 my-5">
          <h2 className=" text-center my-5">
            WHY <span className="text-primary"> CHOOSE AIRPICK?</span>
          </h2>
          <div className="text-center justify-content-center align-items-center">
            <p>Professional and courteous drivers</p>
            <p>Safe, comfortable, and well-maintained vehicles</p>
            <p>On-time pickups and arrivals</p>
            <p>Competitive pricing and exceptional value</p>
            <p>Experience the AirPick difference and let us take the stress out of airport transportation!</p>
          </div>
        </div>
      </section>
    </>
  );
}
