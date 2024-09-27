import React, { useState } from 'react';
import userService from '../services/userService';

const WithDrawalForm = () => {
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleWithdraw = async () => {
        setLoading(true);
        try {
            const response = await userService.withDrawal(amount);
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

    return (
        <div className="Form-container">
            <div className="Form-modal-dialog">
                <div className="Form-modal-content">
                    <div className="Form-modal-body">
                        <h1 className="page-title">Withdrawal Form</h1>
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