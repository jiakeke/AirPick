import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import "../assets/orders.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/orders')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          setOrders([]);
        }
      })
      .catch(error => {
        console.error("Error fetching orders:", error);
        setOrders([]);
      });
  }, []);

  return (
    <>
      <section className="find-job job-list section">
        <div className="container">
          <div className="single-head">
            {/*Start order list*/}
            {/* Single Job */}
            {orders.map((order, index) => (
              <>
                <div className="single-job" key={order.Id}>
                  <div className="job-image">
                    <img src={order.img || "assets/images/jobs/img8.png"} alt="Order" />
                  </div>
                  <div className="job-content">
                    <h4>
                      <a href={order.url}>Category: {order.category}</a>
                    </h4>
                    <p>
                      From: {order.departure} <br />
                      To: {order.destination} <br />
                      Passengers: {order.persons} <br />
                      Luggages: {order.luggages}
                    </p>
                    <ul>
                      <li><i className="lni lni-map-marker" /> Status: {order.status}</li>
                      <li><i className="lni lni-dollar" /> Price: ${order.price}</li>
                    </ul>
                  </div>
                  <div className="job-button">
                    <ul>
                      <li>
                        <a href="#">View Details</a>
                      </li>
                      <li>
                        <span>{order.status}</span>
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
