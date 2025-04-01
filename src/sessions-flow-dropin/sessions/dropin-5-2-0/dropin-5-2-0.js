getClientKey().then((clientKey) => {
  // Check URL for redirectResult and sessionId
  const queryResultString = window.location.search;
  const urlParams = new URLSearchParams(queryResultString);
  const redirectResult = urlParams.get("redirectResult");
  const sessionId = urlParams.get("sessionId");

  function initiateSession() {
    sessionsDropin().then((response) => {
      // console.log(response.data);
        
      const configuration = {
        environment: "test", // Change to 'live' for the live environment.
        clientKey: clientKey, // Public key used for client-side authentication: https://docs.adyen.com/development-resources/client-side-authentication
        session: {
          id: response.id, // Unique identifier for the payment session.
          sessionData: response.sessionData, // The payment session data.
        },
        onPaymentCompleted: (result, component) => {
          console.info(result, component);
          console.log("onPaymentCompleted result", result);
          updateResponseContainer(result);
        },
        onError: (error, component) => {
          console.error(error.name, error.message, error.stack, component);
        },
        onChange: (state, component) => {
          updateStateContainer(state); // Demo purposes only
        },
        beforeSubmit: (data, component, actions) => {
          updateRequestContainer(data);
          actions.resolve(data);
        },
        // Any payment method specific configuration. Find the configuration specific to each payment method:  https://docs.adyen.com/payment-methods
        // For example, this is 3D Secure configuration for cards:
        paymentMethodsConfiguration: {
          giftcard: {
            brandsConfiguration: {
              genericgiftcard: {
                icon: 'https://s3-eu-west-1.amazonaws.com/tpd/logos/51c5f6a80000640005498748/0x0.png',
                name: "The Fashion Cheque",
              },
            },
          },
          ach: {
            // Optional configuration.
            // enableStoreDetails: true,
            hasHolderName: false,
            holderNameRequired: false,
            // billingAddressRequired: false,
            },
          card: {
            // enableStoreDetails: true,
            //   installmentOptions: {
            //     card: {
            //         // Shows 1, 2, and 3 as the numbers of monthly installments that the shopper can choose.
            //         values: [1, 2, 3],
            //         // Shows regular and revolving as plans that the shopper can choose.
            //         plans: [ 'regular', 'revolving' ]
            //     },
            //   // Shows payment amount per installment.
            //   showInstallmentAmounts: true
            // },
            // Optional configuration
            hasHolderName: true,
            holderNameRequired: true,
            disclaimerMessage: {
              message: "By donating you agree to the linkText",
              linkText: "terms and conditions",
              link: "https://www.yourcompany.com/terms-and-conditions"
            }
          },
        },
      };
      async function initiateCheckout() {
        // Create an instance of AdyenCheckout using the configuration object.
        const checkout = await AdyenCheckout(configuration);

        // Create an instance of Drop-in and mount it to the container you created.
        const dropin = checkout
          .create("dropin", {
            showStoredPaymentMethods: false,
            onSelect: (activeComponent) => {
              if (activeComponent.state && activeComponent.state.data)
                updateStateContainer(activeComponent.data); // Demo purposes only
            },
          })
          .mount("#dropin-container");
      }
      initiateCheckout();
    });
  }

  async function handleRedirect() {
    const configuration = {
      environment: "test", // Change to 'live' for the live environment.
      clientKey: clientKey, // Public key used for client-side authentication: https://docs.adyen.com/development-resources/client-side-authentication
      session: {
        id: sessionId, // Retreived identifier for the payment completion on redirect.
      },
      onPaymentCompleted: (result, component) => {
        console.log("test")
        console.log("onPaymentCompleted", result)
        // console.info("onPaymentCompleted", result);
        const paymentResult = result.resultCode;
        if (paymentResult === "Authorised" || paymentResult === "Received") {
          document.getElementById("result-container").innerHTML =
            '<img alt="Success" src="https://checkoutshopper-test.adyen.com/checkoutshopper/images/components/success.svg">';
        } else {
          document.getElementById("result-container").innerHTML =
            '<img alt="Error" src="https://checkoutshopper-test.adyen.com/checkoutshopper/images/components/error.svg">';
        }
        updateResponseContainer(result);
      },
      onChange: (state, component) => {
        updateStateContainer(state); // Demo purposes only
      },
      onError: (error, component) => {
        console.error(error.name, error.message, error.stack, component);
      },
    };
    // Create an instance of AdyenCheckout to handle the shopper returning to your website.
    // Configure the instance with the sessionId you extracted from the returnUrl.
    const checkout = await AdyenCheckout(configuration);
    // Submit the redirectResult value you extracted from the returnUrl.
    checkout.submitDetails({ details: { redirectResult } });
  }

  // If no paramters are present in the URL, mount the Drop-in
  if (!redirectResult && !sessionId) {
    initiateSession();
    // Otherwise, handle the redirect
  } else {
    handleRedirect();
  }
});
