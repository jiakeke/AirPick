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
            <form onSubmit={handleSubmit} className="form-group flex-wrap p-3">
              <label htmlFor="category" className="fs-6 text-uppercase fw-bold text-black">Category</label>
              <input
                type="text"
                name="category"
                value={updatedOrder.category}
                onChange={handleChange}
                className="form-control"
                required
              />

              <label htmlFor="departure" className="fs-6 text-uppercase fw-bold text-black">Departure</label>
              <input
                type="text"
                name="departure"
                value={updatedOrder.departure}
                onChange={handleChange}
                className="form-control"
                required
              />

              <label htmlFor="destination" className="fs-6 text-uppercase fw-bold text-black">Destination</label>
              <input
                type="text"
                name="destination"
                value={updatedOrder.destination}
                onChange={handleChange}
                className="form-control"
                required
              />

              <label htmlFor="persons" className="fs-6 text-uppercase fw-bold text-black">Persons</label>
              <input
                type="number"
                name="persons"
                value={updatedOrder.persons}
                onChange={handleChange}
                className="form-control"
                required
              />

              <label htmlFor="luggages" className="fs-6 text-uppercase fw-bold text-black">Luggages</label>
              <input
                type="number"
                name="luggages"
                value={updatedOrder.luggages}
                onChange={handleChange}
                className="form-control"
                required
              />

              <label htmlFor="flight" className="fs-6 text-uppercase fw-bold text-black">Flight</label>
              <input
                type="text"
                name="flight"
                value={updatedOrder.flight}
                onChange={handleChange}
                className="form-control"
                required
              />

              <label htmlFor="date" className="fs-6 text-uppercase fw-bold text-black">Date</label>
              <input
                type="date"
                name="date"
                value={updatedOrder.date}
                onChange={handleChange}
                className="form-control"
                required
              />

              <label htmlFor="comments" className="fs-6 text-uppercase fw-bold text-black">Comments</label>
              <textarea
                name="comments"
                value={updatedOrder.comments}
                onChange={handleChange}
                className="form-control"
              />

              <label htmlFor="price" className="fs-6 text-uppercase fw-bold text-black">Price</label>
              <input
                type="number"
                name="price"
                value={updatedOrder.price}
                onChange={handleChange}
                className="form-control"
                required
              />

              <div className="d-grid my-3">
                <button type="submit" className="btn btn-primary btn-lg btn-dark text-uppercase btn-rounded-none fs-6">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
