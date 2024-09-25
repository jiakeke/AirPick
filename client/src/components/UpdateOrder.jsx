import { useState } from 'react';
import axios from 'axios';
import { useRef } from 'react';

export default function UpdateOrder({ order, onClose, index }) {
  const [updatedOrder, setUpdatedOrder] = useState({ ...order });

  const handleChange = (e) => {
    setUpdatedOrder({
      ...updatedOrder,
      [e.target.name]: e.target.value,
    });
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:4000/api/orders/update/${order._id}`, updatedOrder, {
        headers: {
          Authorization: `token: ${token}`,
        },
      });
      console.log('Order updated:', response.data);
      onClose();
    } catch (error) {
      console.error('Failed to update order', error);
    }
  };

  return (
    <div className="modal fade" id={`updateorder${index}`} tabIndex="-1" aria-labelledby="updateOrderLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title" id="updateOrderLabel">Update Order</h2>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <label htmlFor="category">Category</label>
              <input
                type="text"
                name="category"
                value={updatedOrder.category}
                onChange={handleChange}
                required
              />

              <label htmlFor="departure">Departure</label>
              <input
                type="text"
                name="departure"
                value={updatedOrder.departure}
                onChange={handleChange}
                required
              />

              <label htmlFor="destination">Destination</label>
              <input
                type="text"
                name="destination"
                value={updatedOrder.destination}
                onChange={handleChange}
                required
              />

              <label htmlFor="persons">Persons</label>
              <input
                type="number"
                name="persons"
                value={updatedOrder.persons}
                onChange={handleChange}
                required
              />

              <label htmlFor="luggages">Luggages</label>
              <input
                type="number"
                name="luggages"
                value={updatedOrder.luggages}
                onChange={handleChange}
                required
              />

              <label htmlFor="flight">Flight</label>
              <input
                type="text"
                name="flight"
                value={updatedOrder.flight}
                onChange={handleChange}
                required
              />

              <label htmlFor="date">Date</label>
              <input
                type="date"
                name="date"
                value={updatedOrder.date}
                onChange={handleChange}
                required
              />

              <label htmlFor="comments">Comments</label>
              <textarea
                name="comments"
                value={updatedOrder.comments}
                onChange={handleChange}
              />

              <label htmlFor="price">Price</label>
              <input
                type="number"
                name="price"
                value={updatedOrder.price}
                onChange={handleChange}
                required
              />

              <button type="submit">Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
