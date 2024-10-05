import useAxios from "../axios";
import React, { useState, useEffect } from "react";
import "./Form.css";

import PayPal from "./PayPal";

const DepositForm = () => {
  const api = useAxios();
  const [amount, setAmount] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [preAmount, setPreAmount] = useState(0);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirm = () => {
    if (amount > 0) {
      setIsConfirmed(true);
      setSuccessMessage("");
    }
  }

  const handleSuccess = (details) => {
      setSuccessMessage(details.message);
      setIsConfirmed(false);
      setAmount(0);
    };

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const balance = (await api.get("/api/users/balance")).data;
        setPreAmount(balance);
      } catch (error) {
        setErrorMessage("Failed to fetch balance");
      }
    };

    fetchBalance();
  }, [handleConfirm]);

  return (
    <>
      <div className="Form-container">
        <div className="Form-modal-dialog">
          <div className="Form-modal-content">
            <div className="Form-modal-body">
              <h2 className="page-title">Deposit</h2>
              <p className="balance-display">
                Current Balance: €{preAmount.toFixed(2)}
              </p>
              {!isConfirmed && (
              <>
              <p className="balance-display">Deposit amount:</p>
              <input
                type="number"
                value={amount}
                className="form-control"
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter deposit amount"
              />
              <div className="Form-btn-container">
                <button
                  onClick={handleConfirm}
                  disabled={!amount || amount <= 0}
                  className="Form-btn"
                >
                </button>
              </div>
              </>
              )}
              {successMessage && (
                <p className="success-message">{successMessage}</p>
              )}
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              {isConfirmed && (
                <>
                    <p className="balance-display">Deposit amount: €{amount}</p>
                    <PayPal amount={amount} onSuccess={handleSuccess} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DepositForm;
