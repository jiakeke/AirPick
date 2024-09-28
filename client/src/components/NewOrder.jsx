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

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`/api/orders/`, newOrder);

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
      console.error("Error creating order:", error);
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
