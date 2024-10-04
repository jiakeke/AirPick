const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;
const base = "https://api-m.sandbox.paypal.com";
const User = require("../models/userModel");
require("dotenv").config();
const mongoose = require("mongoose");
const axios = require("axios");

// ---------- Funtions that will not export ----------
/**
 * Generate an OAuth 2.0 access token for authenticating with PayPal REST APIs.
 * @see https://developer.paypal.com/api/rest/authentication/
 */
const generateAccessToken = async () => {
  try {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      throw new Error("MISSING_API_CREDENTIALS");
    }
    const auth = Buffer.from(
      PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET
    ).toString("base64");
    const response = await axios({
      method: "POST",
      url: `${base}/v1/oauth2/token`,
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Failed to generate Access Token:", error);
  }
};

/**
 * Create an order to start the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
 */
const createOrder = async (balance) => {
  // use the cart information passed from the front-end to calculate the purchase unit details
  console.log(
    "shopping cart information passed from the frontend createOrder() callback:",
    balance
  );

  const accessToken = await generateAccessToken();
  const payload = {
    intent: "CAPTURE",
    perchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: balance,
        },
      },
    ],
  };

  const response = await fetch(`${base}/v2/checkout/orders`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  });
  return handleResponse(response);
};

/**
 * Capture payment for the created order to complete the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
 */
const captureOrder = async (orderID) => {
  const accessToken = await generateAccessToken();

  const response = await fetch(
    `${base}/v2/checkout/orders/${orderID}/capture`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return handleResponse(response);
};

async function handleResponse(response) {
  try {
    const jsonResponse = await response.json();
    return {
      jsonResponse,
      httpStatusCode: response.status,
    };
  } catch (err) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}
// ---------- Funtions that will not export ----------

// ---------- Funtions that willexport ----------
// POST /api/paypal/paypalCreateOrder
const paypalCreateOrder = async (req, res) => {
  const { userId } = req.user;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  try {
    const user = await User.findById(userId);
    if (user && user.category === "passenger") {
      let balance = Number(req.body.balance);

      // Check balance amount
      if (isNaN(balance)) {
        return res.status(400).json({ message: "Invalid balance value" });
      }
      if (balance <= 0) {
        return res
          .status(400)
          .json({ message: "The recharge amount be less than 0!!" });
      }

      // Use PayPal to create order
      try {
        const { jsonResponse, httpStatusCode } = await createOrder(balance);
        res.status(httpStatusCode).json(jsonResponse);
      } catch (error) {
        console.error("PayPal failed to create order:", error);
        res.status(500).json({ error: "PayPal failed to create order." });
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to deposit", error: error.message });
  }
};

// POST /api/paypal/paypalCaptureOrder
const paypalCaptureOrder = async (req, res) => {
  const { userId } = req.user;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  try {
    const { orderID } = req.params;
    const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
    res.status(httpStatusCode).json(jsonResponse);
    if (httpStatusCode === 201) {
      const user = await User.findById(userId);
      if (user && user.category === "passenger") {
        let preBalance = user.balance;
        let balance =
          jsonResponse.perchase_units.payments.captures.amount.value;
        const newBalance = parseFloat(preBalance + balance).toFixed(2);
        const updatedUser = await User.findByIdAndUpdate(
          { _id: userId },
          { balance: newBalance },
          { new: true, overwrite: true }
        );
        if (updatedUser) {
          res.status(200).json({ message: "Deposit successful!" });
        } else {
          res.status(404).json({ message: "User not found" });
        }
      }
    }
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to capture order." });
  }
};

module.exports = {
  paypalCreateOrder,
  paypalCaptureOrder,
};
