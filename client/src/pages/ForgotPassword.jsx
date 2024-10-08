import useAxios from '../axios';
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const api = useAxios();


  const handleSubmit = async (e) => {
    try {
      const response = await api.post('/api/users/forgot_password', {email});

      if (response.status === 200) {
        setMessage('Password reset link has been sent to your email.');
        setError('');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
        setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex flex-wrap flex-column justify-content-center align-items-center">
        <h1 className="page-title display-3 mt-5">Forgot Password</h1>
      </div>
      <div className="mb-3 row">
        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
          Email
        </label>
        <div className="col-sm-10">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="d-grid my-3">
        <button
          type="button"
          onClick={handleSubmit}
          className="btn btn-primary btn-lg btn-dark text-uppercase btn-rounded-none fs-6"
        >Send Reset Link
        </button>
      </div>
      {message && <p>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

