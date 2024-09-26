import React, { useState } from 'react';
import userService from '../services/userService';
import './Form.css';

const DepositForm = () => {
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleDeposit = async () => {
        setLoading(true);
        try {
            const response = await userService.deposit(amount);
            if (response.status === 200) {
                setSuccessMessage(response.data.message);
                setErrorMessage('');
            } else {
                setErrorMessage(response.data.message || "Deposit failed, please try again.");
                setSuccessMessage('');
            }
        } catch (error) {
            setErrorMessage(error.response.data.message || "An error occurred, please try again later.");
            setSuccessMessage('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="Form-container">
            <div className="Form-modal-dialog">
                <div className="Form-modal-content">
                    <div className="Form-modal-body">
                        <h1 className="page-title">Deposit Form</h1>
                        <input
                            type="number"
                            value={amount}
                            className="form-control"
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter deposit amount"
                        />
                        <div className="Form-btn-container">
                            <button onClick={handleDeposit} disabled={loading} className="Form-btn">
                                {loading ? 'Processing...' : 'Deposit'}
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

export default DepositForm;