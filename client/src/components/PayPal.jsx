import React, { useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  FUNDING,
} from "@paypal/react-paypal-js";
import useAxios from "../axios";

// Render errors or successfull transaction on the screen
function Message({ content }) {
  return <p>{content}</p>;
}

export default function PayPal({ amount, onSuccess }) {
  const initialOptions = {
    "client-id":
      "AUsqi_wjEzUTjGGgk955r01czotj3pdc7DaPX8YNksmHJQYb5BdRZ5ROtG2xrcMleavf4iUsZXDcXJ5b",
    "enable-funding": "paylater,venmo",
    "data-sdk-integration-source": "integrationbuilder_sc",
    currency: "EUR",
  };

  const api = useAxios();

  const [message, setMessage] = useState("");

  let orderID = null;

  // function to create a order and recieve the order id
  const createOrder = async () => {
    try {
      const response = await api.post("/api/paypal/paypalCreateOrder", {
        balance: amount,
        //balance: "100",
      });

      const orderData = await response.data;

      if (orderData.id) {
        orderID = orderData.id;
        return orderData.id;
      } else {
        const errorDetail = orderData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : JSON.stringify(orderData);

        throw new Error(errorMessage);
      }
    } catch (error) {
      setMessage(`Could not initiate PayPal Checkout...${error}`);
    }
  };

  // function to capture the order id and procced
  const onApprove = async (data, actions) => {
    try {
      const response = await api.post(
        `/api/paypal/paypalCaptureOrder/${orderID}`
      );

      const orderData = await response.data;
      onSuccess(response.data);
    } catch (error) {
      console.error(error);
      setMessage(`Sorry, your transaction could not be processed...${error}`);
    }
  };

  return (
    <div className="App">
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{
            shape: "rect",
            //color:'blue' change the default color of the buttons
            layout: "vertical", //default value. Can be changed to horizontal
          }}
          fundingSource={FUNDING.PAYPAL}
          createOrder={createOrder}
          onApprove={onApprove}
        />
      </PayPalScriptProvider>
    </div>
  );
}
