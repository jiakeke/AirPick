import React, { useEffect, useState } from 'react';
import "../assets/orders.css";
import { Link } from "react-router-dom";
import useAxios from '../axios';
import ContactPassenger from './MessageBox';

const DriverOrdersPage = () => {
  const api = useAxios();
  const [newOrders, setNewOrders] = useState([]);
  const [myOrders, setMyOrders] = useState({
    pending: [],
    ongoing: [],
    completed: [],
  });
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const availableOrdersRes = await api.get('api/orders/orderlist', {});
        const availableOrdersData = await availableOrdersRes.data;
        setNewOrders(availableOrdersData);

        const myOrdersRes = await api.get('api/orders/myorder', {});
        const myOrdersData = await myOrdersRes.data;
        setMyOrders(myOrdersData);
      } catch (error) {
        console.error('Failed to fetch orders', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [token]);

  const handleAcceptOrder = async (orderId) => {
    try {
      const response = await api.put(`api/orders/accept/${orderId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response) {
        const acceptedOrder = newOrders.find(order => order._id === orderId);
        setNewOrders(newOrders.filter(order => order._id !== orderId));
        setMyOrders((prevOrders) => ({
          ...prevOrders,
          pending: [...prevOrders.pending, acceptedOrder],
        }));
      } else {
        console.error('Failed to accept order');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
      } else {
        console.error('Failed to accept order', error);
      }
    }
  };

  const handleStartOrder = async (orderId) => {
    try {
      const response = await api.put(`api/orders/start/${orderId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response) {
        const startedOrder = myOrders.pending.find(order => order._id === orderId);
        setMyOrders((prevOrders) => ({
          ...prevOrders,
          pending: prevOrders.pending.filter(order => order._id !== orderId),
          ongoing: [...prevOrders.ongoing, startedOrder],
        }));
      } else {
        console.error('Failed to start order');
      }
    } catch (error) {
      console.error('Failed to start order', error);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await api.put(`api/orders/cancel/driver/${orderId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response) {
        const cancelledOrder = myOrders.pending.find(order => order._id === orderId);
        
        setMyOrders((prevOrders) => ({
          ...prevOrders,
          pending: prevOrders.pending.filter(order => order._id !== orderId),
        }));
        
        setNewOrders((prevNewOrders) => [
          ...prevNewOrders,
          cancelledOrder,
        ]);
      } else {
        console.error('Failed to cancel order');
      }
    } catch (error) {
      console.error('Failed to cancel order', error);
    }
  };

  const handleStopOrder = async (orderId) => {
    try {
      const response = await api.put(`api/orders/completeorstop/${orderId}`, {
        action: 'stop',
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response) {
        const stoppedOrder = myOrders.ongoing.find(order => order._id === orderId);
        setMyOrders((prevOrders) => ({
          ...prevOrders,
          ongoing: prevOrders.ongoing.filter(order => order._id !== orderId),
          pending: [...prevOrders.pending, stoppedOrder],
        }));
      } else {
        console.error('Failed to stop order');
      }
    } catch (error) {
      console.error('Failed to stop order', error);
    }
  };

  const handleCompleteOrder = async (orderId) => {
    try {
      const response = await api.put(`api/orders/completeorstop/${orderId}`, {
        action: 'complete',
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response) {
        const completedOrder = myOrders.ongoing.find(order => order._id === orderId);
        setMyOrders((prevOrders) => ({
          ...prevOrders,
          ongoing: prevOrders.ongoing.filter(order => order._id !== orderId),
          completed: [...prevOrders.completed, completedOrder],
        }));
      } else {
        console.error('Failed to complete order');
      }
    } catch (error) {
      console.error('Failed to complete order', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container mt-5">
      <div className="d-flex flex-wrap flex-column justify-content-center align-items-center">
        <h1 className="page-title display-3 mt-5">Driver Orders</h1>
      </div>
      <div>
        <h2>Available Orders</h2>
        <section className="find-job job-list section">
          <div className="container">
            <div className="single-head">
              {newOrders.length > 0 ? (
                newOrders.map((order, index) => (
                  <div className="single-job" key={order._id}>
                    <div className="job-content">
                      <h4>
                        <Link to={order.url}>Category: {order.category}</Link>
                      </h4>
                      <p>
                        From: {order.departure} <br />
                        To: {order.destination} <br />
                        Passengers: {order.persons} <br />
                        Luggages: {order.luggages}
                      </p>
                      <ul>
                        <li><i className="lni lni-dollar" /> Price: €{order.price}</li>
                      </ul>
                      <div className="job-button">
                        <ul>
                          <li>
                            <span>{order.status}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <button onClick={() => handleAcceptOrder(order._id)} 
                      className="btn btn-outline-primary text-uppercase me-3">
                        Accept
                    </button>
                    <button type="button" data-bs-toggle="modal" data-bs-target={`#contactPassenger${index}`}
                      className="btn btn-outline-primary nav-button mx-3 text-white bg-dark text-nowrap"
                      >
                        Contact Passenger
                    </button>
                    <ContactPassenger order={order} index={index} />
                  </div>
              ))) : (
                <p>No available orders.</p>
              )}
            </div>
          </div>
        </section>
      </div>

      <div>
        <h2>Pending Orders</h2>
        <section className="find-job job-list section">
          <div className="container">
            <div className="single-head">
              {myOrders.pending.map(order => (
                <div className="single-job" key={order._id}>
                  <div className="job-content">
                    <h4>
                      <Link to={order.url}>Category: {order.category}</Link>
                    </h4>
                    <p>
                      From: {order.departure} <br />
                      To: {order.destination} <br />
                      Passengers: {order.persons} <br />
                      Luggages: {order.luggages} <br />
                      Passenger Name: {order.passenger.first_name} {order.passenger.last_name} <br />
                      Contact number: {order.passenger.phone} 
                    </p>
                    <ul>
                      <li><i className="lni lni-dollar" /> Price: €{order.price}</li>
                    </ul>
                    <div className="job-button">
                      <ul>
                        <li>
                          <span>{order.status}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <button onClick={() => handleStartOrder(order._id)}
                    className="btn btn-outline-primary text-uppercase me-3">
                      Start
                  </button>
                  <button onClick={() => handleCancelOrder(order._id)}
                    className="btn btn-outline-primary text-uppercase me-3">
                      Cancel
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div>
        <h2>Ongoing Orders</h2>
        <section className="find-job job-list section">
          <div className="container">
            <div className="single-head">
              {myOrders.ongoing.map(order => (
                <div className="single-job" key={order._id}>
                  <div className="job-content">
                    <h4>
                      <Link to={order.url}>Category: {order.category}</Link>
                    </h4>
                    <p>
                      From: {order.departure} <br />
                      To: {order.destination} <br />
                      Passengers: {order.persons} <br />
                      Luggages: {order.luggages} <br />
                      Passenger Name: {order.passenger.first_name} {order.passenger.last_name} <br />
                      Contact number: {order.passenger.phone} 
                    </p>
                    <ul>
                      <li><i className="lni lni-dollar" /> Price: €{order.price}</li>
                    </ul>
                    <div className="job-button">
                      <ul>
                        <li>
                          <span>{order.status}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <button onClick={() => handleStopOrder(order._id)} 
                    className="btn btn-outline-primary text-uppercase me-3">
                      Stop
                  </button>
                  <button onClick={() => handleCompleteOrder(order._id)}
                    className="btn btn-outline-primary text-uppercase me-3">
                      Complete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div>
        <h2>Completed Orders</h2>
        <section className="find-job job-list section">
          <div className="container">
            <div className="single-head">
              {myOrders.completed.map(order => (
                <div className="single-job" key={order._id}>
                  <div className="job-content">
                    <h4>
                      <Link to={order.url}>Category: {order.category}</Link>
                    </h4>
                    <p>
                      From: {order.departure} <br />
                      To: {order.destination} <br />
                      Passengers: {order.persons} <br />
                      Luggages: {order.luggages}
                    </p>
                    <ul>
                      <li><i className="lni lni-dollar" /> Price: €{order.price}</li>
                    </ul>
                    <div className="job-button">
                      <ul>
                        <li>
                          <span>{order.status}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DriverOrdersPage;
