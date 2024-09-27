import React, { useEffect, useState } from 'react';
import "../assets/orders.css";

const DriverOrdersPage = () => {
  const [newOrders, setNewOrders] = useState([{}]);
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
        const availableOrdersRes = await fetch('http://localhost:4000/api/orders/orderlist', {
          headers: {
            Authorization: `token: ${token}`,
          },
        });
        const availableOrdersData = await availableOrdersRes.json();
        setNewOrders(availableOrdersData);

        const myOrdersRes = await fetch('http://localhost:4000/api/orders/myorder', {
          headers: {
            Authorization: `token: ${token}`,
          },
        });
        const myOrdersData = await myOrdersRes.json();
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
      const response = await fetch(`http://localhost:4000/api/orders/accept/${orderId}`, {
        method: 'PUT',
        headers: {
          Authorization: `token: ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
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
      console.error('Failed to accept order', error);
    }
  };

  const handleStartOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/orders/start/${orderId}`, {
        method: 'PUT',
        headers: {
          Authorization: `token: ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
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
      const response = await fetch(`http://localhost:4000/api/orders/cancel/driver/${orderId}`, {
        method: 'PUT',
        headers: {
          Authorization: `token: ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const cancelledOrder = myOrders.pending.find(order => order._id === orderId);
        
        setMyOrders((prevOrders) => ({
          ...prevOrders,
          pending: prevOrders.pending.filter(order => order._id !== orderId),
        }));
        
        let prevNewOrders = [];
        if (prevNewOrders.length > 0) {
          setNewOrders((prevNewOrders) => [
            ...prevNewOrders,
            cancelledOrder,
          ])
        } else {
          setNewOrders(() => [
            cancelledOrder,
          ])
        };
      } else {
        console.error('Failed to cancel order');
      }
    } catch (error) {
      console.error('Failed to cancel order', error);
    }
  };
  

  const handleStopOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/orders/completeorstop/${orderId}`, {
        method: 'PUT',
        headers: {
          Authorization: `token: ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'stop' }),
      });

      if (response.ok) {
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
      const response = await fetch(`http://localhost:4000/api/orders/completeorstop/${orderId}`, {
        method: 'PUT',
        headers: {
          Authorization: `token: ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'complete' }),
      });

      if (response.ok) {
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
                newOrders.map(order => (
                  <div className="single-job" key={order._id}>
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
                        <li><i className="lni lni-dollar" /> Price: ${order.price}</li>
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
                      <a href={order.url}>Category: {order.category}</a>
                    </h4>
                    <p>
                      From: {order.departure} <br />
                      To: {order.destination} <br />
                      Passengers: {order.persons} <br />
                      Luggages: {order.luggages}
                    </p>
                    <ul>
                      <li><i className="lni lni-dollar" /> Price: ${order.price}</li>
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
                      <a href={order.url}>Category: {order.category}</a>
                    </h4>
                    <p>
                      From: {order.departure} <br />
                      To: {order.destination} <br />
                      Passengers: {order.persons} <br />
                      Luggages: {order.luggages}
                    </p>
                    <ul>
                      <li><i className="lni lni-dollar" /> Price: ${order.price}</li>
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
                      <a href={order.url}>Category: {order.category}</a>
                    </h4>
                    <p>
                      From: {order.departure} <br />
                      To: {order.destination} <br />
                      Passengers: {order.persons} <br />
                      Luggages: {order.luggages}
                    </p>
                    <ul>
                      <li><i className="lni lni-dollar" /> Price: ${order.price}</li>
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
