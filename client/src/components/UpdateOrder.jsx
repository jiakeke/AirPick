import { useState } from 'react';
import { useRef } from 'react';
import { useNavigate } from "react-router-dom";

export default function UpdateOrder({ order, index, onUpdate }) {
  const closeRef = useRef();
  const [updatedOrder, setUpdatedOrder] = useState({ ...order });

  const handleChange = (e) => {
    setUpdatedOrder({
      ...updatedOrder,
      [e.target.name]: e.target.value,
    });
  };

  let navigateTo = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      onUpdate(order._id, updatedOrder, () => {
        closeRef.current.click();
        navigateTo("/");
      });
    } catch (error) {
      console.error('Failed to update order', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? '' : date.toISOString().split('T')[0];
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
              ref={closeRef}
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
                disabled
              />

              <label htmlFor="departure" className="fs-6 text-uppercase fw-bold text-black">Departure</label>
              <input
                type="text"
                name="departure"
                value={updatedOrder.departure}
                onChange={handleChange}
                className="form-control"
                required
                disabled
              />

              <label htmlFor="destination" className="fs-6 text-uppercase fw-bold text-black">Destination</label>
              <input
                type="text"
                name="destination"
                value={updatedOrder.destination}
                onChange={handleChange}
                className="form-control"
                required
                disabled
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
                value={formatDate(updatedOrder.date)}
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
                <button type="submit" 
                        className="btn btn-primary btn-lg btn-dark text-uppercase btn-rounded-none fs-6"
                        data-bs-dismiss="modal"
                        onClick={handleSubmit}>
                          Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
