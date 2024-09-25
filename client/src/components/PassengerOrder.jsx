import React, { useEffect, useState } from 'react';
import UpdateOrder from './UpdateOrder';
import '../assets/passenger.css';

const PassengerOrdersPage = () => {
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/orders/myorder', {
          headers: {
            Authorization: `token: ${token}`,
          },
        });
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    try {
      await fetch(`http://localhost:4000/api/orders/cancel/passenger/${orderId}`, {
        method: 'PUT',
        headers: {
          Authorization: `token: ${token}`,
        },
      });
      setOrders((prevOrders) => ({
        ...prevOrders,
        new: prevOrders.new.filter(order => order._id !== orderId),
        pending: prevOrders.pending.filter(order => order._id !== orderId),
      }));
    } catch (error) {
      console.error('Failed to cancel order', error);
    }
  };

  const handleUpdateOrder = (order) => {
    setCurrentOrder(order);
    setIsModalOpen(true);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="passenger-orders">
      <h1 className="section-title">Your Orders</h1>
      <div className="order-list">
        <h2>New Orders</h2>
        {orders.new.map(order => (
          <div key={order._id}>
            <p>{order.departure} -{'>'} {order.destination}</p>
            <button onClick={() => handleCancelOrder(order._id)}>Cancel</button>
            <button onClick={() => handleUpdateOrder(order)}>Update</button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <UpdateOrder
          order={currentOrder} 
          onClose={() => setIsModalOpen(false)}
        />
      )}

      <div>
        <h2>Pending Orders</h2>
        {orders.pending.map(order => (
          <div key={order._id}>
            <p>{order.departure} -{'>'} {order.destination}</p>
            <button onClick={() => handleCancelOrder(order._id)}>Cancel</button>
          </div>
        ))}
      </div>

      <div>
        <h2>Ongoing Orders</h2>
        {orders.ongoing.map(order => (
          <div key={order._id}>
            <p>{order.departure} -{'>'} {order.destination}</p>
          </div>
        ))}
      </div>

      <div>
        <h2>Completed Orders</h2>
        {orders.completed.map(order => (
          <div key={order._id}>
            <p>{order.departure} -{'>'} {order.destination}</p>
          </div>
        ))}
      </div>

      <div>
        <h2>Cancelled Orders</h2>
        {orders.cancelled.map(order => (
          <div key={order._id}>
            <p>{order.departure} -{'>'} {order.destination}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PassengerOrdersPage;
