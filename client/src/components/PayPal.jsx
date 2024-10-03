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
        headers: {},
      });
    } catch {}
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
