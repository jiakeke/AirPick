import React, { useEffect, useState } from 'react';
import UpdateOrder from './UpdateOrder';
import NewOrderPage from './NewOrder';
import useAxios from '../axios';
import "../assets/orders.css";

const PassengerOrdersPage = () => {
  const api = useAxios();
  const [orders, setOrders] = useState({
    new: [],
    pending: [],
    ongoing: [],
    completed: [],
    cancelled: [],
  });
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;

  useEffect(() => {
    const fetchOrders = async () => {
      try {

        const response = await api.get('api/orders/myorder', {});
        const data = await response.data;
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [token]);

  const handleCancelOrder = async (orderId) => {
    try {
      await api.put(`api/orders/cancel/passenger/${orderId}`, {});
      setOrders((prevOrders) => {
        const cancelledOrder = prevOrders.new.find(order => order._id === orderId) ||
                               prevOrders.pending.find(order => order._id === orderId);
  
        return {
          ...prevOrders,
          new: prevOrders.new.filter(order => order._id !== orderId),
          pending: prevOrders.pending.filter(order => order._id !== orderId),
          cancelled: [...prevOrders.cancelled, cancelledOrder],
        };
      });
    } catch (error) {
      console.error('Failed to cancel order', error);
    }
  };

  const handleUpdateOrder = async (orderId, updatedData, onClose) => {
    try {
      const response = await api.put(`api/orders/update/${orderId}`, updatedData);
      const updatedOrder = response.data;
      const fetchOrders = async () => {
        try {
          const response = await api.get('api/orders/myorder', {});
          const data = await response.data;
          setOrders(data);
        } catch (error) {
          console.error('Failed to fetch orders', error);
        } finally {
          setLoading(false);
        }
      };
      console.log('Order updated:', updatedOrder);
  
      setOrders((prevOrders) => {
        const newOrders = prevOrders.new.map(order => order._id === orderId ? updatedOrder : order);
        const pendingOrders = prevOrders.pending.map(order => order._id === orderId ? updatedOrder : order);
  
        return {
          ...prevOrders,
          new: newOrders,
          pending: pendingOrders,
        };
      });

      onClose();
      fetchOrders();
    } catch (error) {
      console.error('Failed to update order', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="d-flex flex-wrap flex-column justify-content-center align-items-center">
        <h1 className="page-title display-3 mt-5">Your Orders</h1>
        <button
          type="button"
          className="btn btn-primary btn-lg mt-3"
          data-bs-toggle="modal"
          data-bs-target="#newOrderModal"
        >
          Create New Order
        </button>
        <NewOrderPage onClose={() => remove('show')} />
      </div>
      <div>
        <h2>New Orders</h2>
        <section className="find-job job-list section">
          <div className="container">
            <div className="single-head">
              {orders.new.map((order, index) => (
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
                  <button onClick={() => handleCancelOrder(order._id)}
                      className="btn btn-outline-primary text-uppercase me-3">
                        Cancel
                  </button>
                  <button
                      type="button"
                      className="btn btn-outline-primary nav-button mx-3 text-white bg-dark text-nowrap"
                      data-bs-toggle="modal"
                      data-bs-target={`#updateorder${index}`} 
                    >
                      Update
                  </button>
                  <UpdateOrder
                    order={order}
                    index={index}
                    onUpdate={(orderId, updatedData) => handleUpdateOrder(orderId, updatedData, () => document.getElementById(`updateorder${index}`).classList.remove('show'))}
                    onClose={() => document.getElementById(`updateorder${index}`).classList.remove('show')}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div>
        <h2>Pending Orders</h2>
        <section className="find-job job-list section">
          <div className="container">
            <div className="single-head">
              {orders.pending.map(order => (
                <div className="single-job" key={order._id}>
                  <div className="job-content">
                    <h4>
                      <a href={order.url}>Category: {order.category}</a>
                    </h4>
                    <p>
                      From: {order.departure} <br />
                      To: {order.destination} <br />
                      Passengers: {order.persons} <br />
                      Luggages: {order.luggages} <br />
                      Driver Name: {order.driver.first_name} {order.driver.last_name}<br />
                      Contact number: {order.driver.phone} 
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
              {orders.ongoing.map(order => (
                <div className="single-job" key={order._id}>
                  <div className="job-content">
                    <h4>
                      <a href={order.url}>Category: {order.category}</a>
                    </h4>
                    <p>
                      From: {order.departure} <br />
                      To: {order.destination} <br />
                      Passengers: {order.persons} <br />
                      Luggages: {order.luggages} <br />
                      Driver Name: {order.driver.first_name} {order.driver.last_name} <br />
                      Contact number: {order.driver.phone} 
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

      <div>
        <h2>Completed Orders</h2>
        <section className="find-job job-list section">
          <div className="container">
            <div className="single-head">
              {orders.completed.map(order => (
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

      <div>
        <h2>Cancelled Orders</h2>
        <section className="find-job job-list section">
          <div className="container">
            <div className="single-head">
              {orders.cancelled.map(order => (
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

export default PassengerOrdersPage;