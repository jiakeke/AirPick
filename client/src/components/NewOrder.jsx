import { useState } from 'react';
import useAxios from '../axios';
import "../assets/newOrder.css";


export default function NewOrderPage() {
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
      console.log("Order created:", response.data);
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
    <div className="new-order-form">
      <h2 className="section-title">Create a New Order</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="category">Category</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="category"
              value="pick"
              checked={newOrder.category === 'pick'}
              onChange={handleTypeChange}
            />
            Pick
          </label>
          <label>
            <input
              type="radio"
              name="category"
              value="drop"
              checked={newOrder.category === 'drop'}
              onChange={handleTypeChange}
            />
            Drop
          </label>
        </div>

        <label htmlFor="departure">Departure</label>
        <input
          type="text"
          name="departure"
          placeholder="Departure"
          value={newOrder.category === 'pick' ? 'Lentäjäntie 3, 01530 Vantaa' : newOrder.departure}
          onChange={handleChange}
          readOnly={newOrder.category === 'pick'}
          onBlur={calculateEstimatedPrice}
          required
        />

        <label htmlFor="destination">Destination</label>
        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={newOrder.category === 'drop' ? 'Lentäjäntie 3, 01530 Vantaa' : newOrder.destination}
          onChange={handleChange}
          readOnly={newOrder.category === 'drop'}
          onBlur={calculateEstimatedPrice}
          required
        />

        <label htmlFor="persons">Number of Persons</label>
        <input
          type="number"
          name="persons"
          placeholder="Number of persons"
          value={newOrder.persons}
          onChange={handleChange}
          required
        />

        <label htmlFor="luggages">Number of Luggages</label>
        <input
          type="number"
          name="luggages"
          placeholder="Number of luggages"
          value={newOrder.luggages}
          onChange={handleChange}
          required
        />

        <label htmlFor="flight">Flight number</label>
        <input
          type="text"
          name="flight"
          placeholder="Flight"
          value={newOrder.flight}
          onChange={handleChange}
          required
        />

        <label htmlFor="date">Date</label>
        <input
          type="date"
          name="date"
          placeholder="Date"
          value={newOrder.date}
          onChange={handleChange}
          required
        />

        <label htmlFor="comments">Additional Comments</label>
        <textarea
          name="comments"
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
          name="price"
          placeholder="Price"
          value={newOrder.price}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
