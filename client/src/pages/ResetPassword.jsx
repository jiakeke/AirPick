import useAxios from '../axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const api = useAxios();
  const { loginRef } = useAuth();

  const handleSubmit = async (e) => {
    try {
      const response = await api.post(`/api/users/reset_password/${token}`, { password });

      if (response.status === 200) {
        setMessage('Password has been reset successfully');
        if (loginRef.current) {
            loginRef.current.click();
        }
      } else {
        setError(data.error);
      }
    } catch (err) {
      console.log("err", );
      setError(err.response.data.error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex flex-wrap flex-column justify-content-center align-items-center">
        <h1 className="page-title display-3 mt-5">Reset Password</h1>
      </div>
      <div className="mb-3 row">
        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
          New Password
        </label>
        <div className="col-sm-10">
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="d-grid my-3">
        <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-primary btn-lg btn-dark text-uppercase btn-rounded-none fs-6"
        >Reset Password
        </button>
      </div>
      {message && <p>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

