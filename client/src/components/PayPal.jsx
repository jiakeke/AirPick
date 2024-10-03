import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

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

  const [message, setMessage] = useState("");

  const createOrder = async () => {
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // use the "body" param to optionally pass additional order information
        // like product ids and quantities
        body: JSON.stringify({
          cart: [
            {
              id: 1,
              quantity: 2,
            },
          ],
        }),
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

  return (
    <div className="App">
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{
            shape: "rect",
            //color:'blue' change the default color of the buttons
            layout: "vertical", //default value. Can be changed to horizontal
          }}
          createOrder={createOrder()}
        />
      </PayPalScriptProvider>
    </div>
  );
}
