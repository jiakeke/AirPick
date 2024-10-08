import { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import useAxios from '../axios';

export default function NewOrderModal() {
  const closeRef = useRef();
  let navigateTo = useNavigate();
  const api = useAxios();
  const [newOrder, setNewOrder] = useState({
    category: 'pick',
    departure: 'Lentäjäntie 3, 01530 Vantaa',
    destination: '',
    persons: 0,
    luggages: 0,
    flight: '',
    date: '',
    comments: '',
    price: 0,
  });
  const [estimatedPrice, setEstimatedPrice] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`api/orders`, newOrder, {});
      setNewOrder({
        category: 'pick',
        departure: '',
        destination: '',
        persons: 0,
        luggages: 0,
        flight: '',
        date: '',
        comments: '',
        price: 0,
      });
      closeRef.current.click();
      navigateTo("/");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        console.error("Error creating order:", error);
      }
    }
  };

  const handleChange = (e) => {
    setNewOrder({
      ...newOrder,
      [e.target.name]: e.target.value,
    });
  };

  const handleTypeChange = (e) => {
    const category = e.target.value;
    setNewOrder({
      ...newOrder,
      category,
      departure: category === 'pick' ? 'Lentäjäntie 3, 01530 Vantaa' : newOrder.departure,
      destination: category === 'drop' ? 'Lentäjäntie 3, 01530 Vantaa' : newOrder.destination,
    });
  };

  const calculateEstimatedPrice = async () => {
    const { departure, destination } = newOrder;
    if (!departure || !destination) return;

    try {
      const response = await api.get('api/distance', {
        params: {
          origins: departure,
          destinations: destination,
        },
      });

      const distanceInMeters = response.data.rows[0].elements[0].distance.value;
      const distanceInKm = distanceInMeters / 1000;

      const baseFare = 5; // $5 base fare
      const perKmFare = 1; // $1 per km
      const estimatedPrice = baseFare + (distanceInKm * perKmFare);

      setEstimatedPrice(estimatedPrice.toFixed(2));
    } catch (error) {
      console.error('Failed to calculate estimated price', error);
    }
  };

  return (
    <div className="modal fade" id="newOrderModal" tabIndex="-1" aria-labelledby="newOrderLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title" id="newOrderLabel">Create a New Order</h2>
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
              <div className="radio-group">
                <label className="form-check form-check-inline">
                  <input
                    type="radio"
                    name="category"
                    value="pick"
                    checked={newOrder.category === 'pick'}
                    onChange={handleTypeChange}
                  />
                  &nbsp;&nbsp;Pick
                </label>
                <label className="form-check form-check-inline">
                  <input
                    type="radio"
                    name="category"
                    value="drop"
                    checked={newOrder.category === 'drop'}
                    onChange={handleTypeChange}
                  />
                  &nbsp;&nbsp;Drop
                </label>
              </div>

              <label htmlFor="departure" className="fs-6 text-uppercase fw-bold text-black">Departure</label>
              <input
                type="text"
                className="form-control"
                name="departure"
                placeholder="Departure"
                value={newOrder.category === 'pick' ? 'Lentäjäntie 3, 01530 Vantaa' : newOrder.departure}
                onChange={handleChange}
                readOnly={newOrder.category === 'pick'}
                onBlur={calculateEstimatedPrice}
                required
              />

              <label htmlFor="destination" className="fs-6 text-uppercase fw-bold text-black">Destination</label>
              <input
                type="text"
                className="form-control"
                name="destination"
                placeholder="Destination"
                value={newOrder.category === 'drop' ? 'Lentäjäntie 3, 01530 Vantaa' : newOrder.destination}
                onChange={handleChange}
                readOnly={newOrder.category === 'drop'}
                onBlur={calculateEstimatedPrice}
                required
              />

              <label htmlFor="persons" className="fs-6 text-uppercase fw-bold text-black">Number of Persons</label>
              <input
                type="number"
                className="form-control"
                name="persons"
                placeholder="Number of persons"
                value={newOrder.persons}
                onChange={handleChange}
                required
              />

              <label htmlFor="luggages" className="fs-6 text-uppercase fw-bold text-black">Number of Luggages</label>
              <input
                type="number"
                className="form-control"
                name="luggages"
                placeholder="Number of luggages"
                value={newOrder.luggages}
                onChange={handleChange}
                required
              />

              <label htmlFor="flight" className="fs-6 text-uppercase fw-bold text-black">Flight number</label>
              <input
                type="text"
                className="form-control"
                name="flight"
                placeholder="Flight"
                value={newOrder.flight}
                onChange={handleChange}
                required
              />

              <label htmlFor="date" className="fs-6 text-uppercase fw-bold text-black">Date</label>
              <input
                type="date"
                className="form-control"
                name="date"
                placeholder="Date"
                value={newOrder.date}
                onChange={handleChange}
                required
              />

              <label htmlFor="comments" className="fs-6 text-uppercase fw-bold text-black">Additional Comments</label>
              <textarea
                name="comments"
                className="form-control"
                placeholder="Additional comments"
                value={newOrder.comments}
                onChange={handleChange}
              ></textarea>

              {estimatedPrice && (
                <div className="estimated-price">
                  <p>Estimated Price: €{estimatedPrice}</p>
                </div>
              )}

              <label htmlFor="price">Price</label>
              <input
                type="number"
                className="form-control"
                name="price"
                placeholder="Price"
                value={newOrder.price}
                onChange={handleChange}
                required
              />

              <div className="d-grid my-3">
                <button type="submit" 
                        className="btn btn-primary btn-lg btn-dark text-uppercase btn-rounded-none fs-6"
                        data-bs-dismiss="modal"
                        onClick={handleSubmit}>
                          Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
