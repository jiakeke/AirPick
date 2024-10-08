import { useState } from 'react';
import useAxios from '../axios';

export default function ContactPassenger({ order, index }) {
  const [message, setMessage] = useState("");
  const api = useAxios();

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const receiverId = order.passenger;
    const orderId = order._id;
    try {
      await api.post("/api/messages/send", { receiverId, orderId, content: message });
      alert('Message sent successfully!');
      setMessage('');
      document.getElementById(`closeModal${index}`).click();
    } catch (error) {
      console.error('Failed to send message', error);
      alert('Failed to send the message. Please try again later.');
    }
  };

  return (
    <div className="modal fade" id={`contactPassenger${index}`} tabIndex="-1" aria-labelledby="contactPassengerLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title" id="contactPassengerLabel">Contact Passenger</h2>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id={`closeModal${index}`}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSendMessage}>
              <label htmlFor="message" className="fs-6 text-uppercase fw-bold text-black">Message</label>
              <textarea
                name="message"
                value={message}
                onChange={handleMessageChange}
                className="form-control"
                required
              ></textarea>
              <div className="mt-3">
                <button type="submit" className="btn btn-primary">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
