const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;
const base = "https://api-m.sandbox.paypal.com";
const User = require("../models/userModel");
require("dotenv").config();
const mongoose = require("mongoose");
const axios = require("axios");
const qs = require("qs");
const { response } = require("express");

// ---------- Funtions that will not export ----------
/**
 * Generate an OAuth 2.0 access token for authenticating with PayPal REST APIs.
 * @see https://developer.paypal.com/api/rest/authentication/
 */
const generateAccessToken = async () => {
  if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
    throw new Error("MISSING_API_CREDENTIALS");
  }

  const clientId = PAYPAL_CLIENT_ID;
  const clientSecret = PAYPAL_CLIENT_SECRET;

  const datas = qs.stringify({ grant_type: "client_credentials" });
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${clientId}:${clientSecret}`
      ).toString("base64")}`,
    },
  };

  try {
    const response = await axios.post(`${base}/v1/oauth2/token`, datas, config);
    return response.data.access_token;
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

  let data = JSON.stringify({
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: balance,
        },
        reference_id: "d9f80740-38f0-11e8-b467-0ed5f89f718b",
      },
    ],
    intent: "CAPTURE",
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api-m.sandbox.paypal.com/v2/checkout/orders",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    data: data,
  };
  const response = await axios.request(config).catch((error) => {
    console.log(error);
  });
  return response;
};

/**
 * Capture payment for the created order to complete the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
 */
const captureOrder = async (orderID) => {
  const accessToken = await generateAccessToken();

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${base}/v2/checkout/orders/${orderID}/capture`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const response = await axios.request(config).catch((error) => {
    console.log(error);
  });
  return response;
};

async function handleResponse(response) {
  try {
    const jsonResponse = await response.json();
    return {
      jsonResponse,
      httpStatusCode: response.status,
    };
  } catch (err) {
    const errorMessage = await response.json();
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

      console.log(req.body);

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
        const response = await createOrder(balance);
        if ((response.status = 201)) {
          res.status(201).json(response.data);
        }
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

// POST /api/paypal/paypalCaptureOrder/:orderID
const paypalCaptureOrder = async (req, res) => {
  const { userId } = req.user;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  try {
    const { orderID } = req.params;
    const response = await captureOrder(orderID);
    if (response.status === 201) {
      const user = await User.findById(userId);
      if (user && user.category === "passenger") {
        console.log("wwwwwwwwwwwwww");

        let preBalance = user.balance;
        let balance = await parseFloat(
          response.data.purchase_units[0].payments.captures[0].amount.value
        );
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
