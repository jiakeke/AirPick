import React, { useEffect, useState } from 'react';

const DriverOrdersPage = () => {
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
  }, [token]); // Only run this effect when the token changes

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
    <div>
      <h1>Driver Orders</h1>
      
      <div>
        <h2>Available Orders</h2>
        {newOrders.map(order => (
          <div key={order._id}>
            <p>{order.departure} -{'>'} {order.destination}</p>
            <button onClick={() => handleAcceptOrder(order._id)}>Accept</button>
          </div>
        ))}
      </div>

      <div>
        <h2>Pending Orders</h2>
        {myOrders.pending.map(order => (
          <div key={order._id}>
            <p>{order.departure} -{'>'} {order.destination}</p>
            <button onClick={() => handleStartOrder(order._id)}>Start</button>
            <button onClick={() => handleCancelOrder(order._id)}>Cancel</button>
          </div>
        ))}
      </div>

      <div>
        <h2>Ongoing Orders</h2>
        {myOrders.ongoing.map(order => (
          <div key={order._id}>
            <p>{order.departure} -{'>'} {order.destination}</p>
            <button onClick={() => handleStopOrder(order._id)}>Stop</button>
            <button onClick={() => handleCompleteOrder(order._id)}>Complete</button>
          </div>
        ))}
      </div>

      <div>
        <h2>Completed Orders</h2>
        {myOrders.completed.map(order => (
          <div key={order._id}>
            <p>{order.departure} -{'>'} {order.destination}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriverOrdersPage;
