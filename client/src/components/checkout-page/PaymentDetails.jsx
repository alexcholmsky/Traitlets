import StripeCheckoutCard from "./StripeCheckoutCard";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { SelectionContext, useSelectionContext, SelectionContextProvider } from '../../context/SelectionContext';

const stripePromise = loadStripe("pk_test_51OUZkiCOJiubhZCCCsbqkMtZY1LuVE7eJru7jKxF47c4xTzZCN9n6i2s7vYAcpLyL0AbkkzI5sR99PHiuiPG1FvU00qlsjgshZ");

const PaymentDetails = () => {
  const { setCheckoutPrice } = useSelectionContext()

  const [clientSecret, setClientSecret] = useState("");
  const storedDetails = localStorage.getItem('braceletDetails');
  const braceletDetails = JSON.parse(storedDetails);
  console.log("payment details", braceletDetails)

  useEffect(() => {
    console.log("Starting PD useEffect");
    console.log("payment details in useEffect", braceletDetails)

    // Create PaymentIntent with the dynamically determined productId
    fetch("https://traitlets-be.onrender.com/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ braceletDetails })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("PaymentIntent data:", data);
        setClientSecret(data.clientSecret);
        setCheckoutPrice(data.productPrice);
      })
      .catch((error) => {
        console.error("Error during PD fetch:", error);
      })
      .finally(() => {
        console.log("Ending PD useEffect");
      });
  }, []);
  

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className='flex items-center justify-center h-full'>
      <div className='lg:w-[40rem] mt-[0.5rem]'>
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <StripeCheckoutCard/>
          </Elements>
        )}
      </div>
    </div>
  )
}

export default PaymentDetails