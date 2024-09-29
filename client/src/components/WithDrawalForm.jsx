import useAxios from '../axios';
import React, { useState, useEffect } from 'react';

const WithDrawalForm = () => {
    const api = useAxios();
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const[preAmount, setPreAmount] = useState(0);
   
    const handleWithdraw = async () => {
        setLoading(true);
        try {
            const response = await api.put("/api/users/withDrawal", {balance: amount});
            if (response.status === 200) {
                setSuccessMessage(response.data.message);
                setErrorMessage('');
            } else {
                setErrorMessage(response.data.message || "Withdrawal failed, please try again.");
                setSuccessMessage('');
            }
        } catch (error) {
            setErrorMessage(error.response.data.message || "An error occurred, please try again later.");
            setSuccessMessage('');
        } finally {
            setLoading(false);
        }
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
      }, [handleWithdraw]);
    return (
        <div className="Form-container">
            <div className="Form-modal-dialog">
                <div className="Form-modal-content">
                    <div className="Form-modal-body">
                        <h2 className="page-title">Withdrawal Form</h2>
                        <p className="balance-display">Current Balance: €{preAmount.toFixed(2)}</p>
                        <input
                            type="number"
                            value={amount}
                            className="form-control"
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter withdrawal amount"
                        />
                        <div className="Form-btn-container">
                            <button onClick={handleWithdraw} disabled={loading} className="Form-btn">
                                {loading ? 'Processing...' : 'Withdraw'}
                            </button>
                        </div>

                        {successMessage && <p className="success-message">{successMessage}</p>}
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WithDrawalForm;
