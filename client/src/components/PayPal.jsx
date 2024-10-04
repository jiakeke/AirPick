import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import useAxios from "../axios";

// Render errors or successfull transaction on the screen
function Message({ content }) {
  return <p>{content}</p>;
}

export default function PayPal() {
  const initialOptions = {
    "client-id":
      "AUsqi_wjEzUTjGGgk955r01czotj3pdc7DaPX8YNksmHJQYb5BdRZ5ROtG2xrcMleavf4iUsZXDcXJ5b",
    "enable-funding": "paylater,venmo",
    "data-sdk-integration-source": "integrationbuilder_sc",
  };

  const api = useAxios();

  const [message, setMessage] = useState("");

  // function to create a order and recieve the order id
  const createOrder = async () => {
    try {
      const response = await api.post("/api/paypal/paypalCreateOrder", {
        balance: "100",
      });

      const orderData = await response.json();
      if (orderData.id) {
        return orderData.id;
      } else {
        const errorDetail = orderData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : JSON.stringify(orderData);

        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error(error);
      setMessage(`Could not initiate PayPal Checkout...${error}`);
    }
  };

  // function to capture the order id and procced
  const onApprove = async (data, actions) => {
    try {
      const response = await api.post("/api/paypal/paypalCaptureOrder");

      const orderData = await response.json();

      const errorDetail = orderData?.details?.[0];

      if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
        // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
        // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
        return actions.restart();
      } else if (errorDetail) {
        // (2) Other non-recoverable errors -> Show a failure message
        throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
      } else {
        // (3) Successful transaction -> Show confirmation or thank you message
        // Or go to another URL:  actions.redirect('thank_you.html');
        const transaction = orderData.purchase_units[0].payments.captures[0];
        setMessage(
          `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
        );
        console.log(
          "Capture result",
          orderData,
          JSON.stringify(orderData, null, 2)
        );
      }
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
          createOrder={createOrder}
          onApprove={onApprove}
        />
      </PayPalScriptProvider>
    </div>
  );
}
