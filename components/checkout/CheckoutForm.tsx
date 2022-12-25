import React, { useEffect, useState } from "react";
import { PaymentElement, useStripe, useElements, AddressElement } from "@stripe/react-stripe-js";
import CheckoutSummary from "./CheckoutSummary";
import { useRouter } from "next/router";
import { useAppSelector } from "../../hooks";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [cardError, setCardError] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/payment",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setCardError(error.message);
    } else {
      setCardError("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <div>
      <div>
        <h2 className="text-lg lg:text-xl font-semibold lg:font-semibold text-gray-800">Complete your payment</h2>
        <p className="text-base text-gray-600">Enter your card Details and verify to successfully place the order.</p>
      </div>

      <form id="payment-form" onSubmit={handleSubmit} className="min-w-max mt-6 w-full">
        <div className="mb-6">
          <h3 className="font-medium text-gray-800 mb-2">Shipping Address</h3>

          <AddressElement
            options={{
              mode: "shipping",
              autocomplete: {
                mode: "disabled",
              },
              display: {
                name: "split",
              },
              allowedCountries: ["IN"],

              fields: {
                phone: "always",
              },
              validation: {
                phone: {
                  required: "always",
                },
              },
            }}
          />
        </div>

        <PaymentElement id="payment-element" options={{}} />

        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          type="submit"
          className="bg-indigo-500 font-semibold text-white w-full px-4 py-2 rounded-lg mt-4 disabled:bg-indigo-300 disabled:cursor-not-allowed"
        >
          <span id="button-text">Pay now</span>
        </button>

        <button
          type="button"
          className="border-indigo-500 border-2 text-indigo-500 w-full px-4 py-2 rounded-lg mt-4 font-medium hover:shadow-lg shadow-indigo-500"
          disabled={isLoading}
          onClick={() => router.back()}
        >
          Go Back
        </button>

        <div>
          {cardError && (
            <div className="bg-red-50 border-red-500 text-red-500 px-4 py-2 text-center text-sm rounded mt-4">
              <p className="max-w-md text-center min-w-0">{cardError}</p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
