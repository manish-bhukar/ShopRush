import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { useSelector } from 'react-redux';
import { selectCurrentOrder } from "../features/Order/orderSlice";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const currentOrder = useSelector(selectCurrentOrder);

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!stripe || !elements) {
    return;
  }

  setIsLoading(true);

  const returnUrl = `https://localhost:8080/order-success/${currentOrder.id}`;

  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: {
      return_url: returnUrl,
    },
  });

  if (error) {
    console.error("Payment confirmation error:", error);
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }
  } else {
    console.log("Payment confirmed successfully!");
    setMessage("Payment succeeded!");
  }

  setIsLoading(false);
};


  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}