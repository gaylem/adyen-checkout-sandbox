getClientKey().then((clientKey) => {
  // Check URL for redirectResult and sessionId
  const queryResultString = window.location.search;
  const urlParams = new URLSearchParams(queryResultString);
  const redirectResult = urlParams.get("redirectResult");
  const sessionId = urlParams.get("sessionId");

  function initiateSession() {
    sessionsDropin().then((response) => {

      const { AdyenCheckout, Dropin } = window.AdyenWeb;
        
      const configuration = {
        environment: "test", 
        clientKey: clientKey,
        session: {
          id: response.id, // Unique identifier for the payment session.
          sessionData: response.sessionData, 
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
      };
      async function initiateCheckout() {
      // Create an instance of AdyenCheckout using the configuration object.
      const checkout = await AdyenCheckout(configuration);

      // Create an instance of Drop-in and mount it to the container you created.
      const dropin = new Dropin(checkout, {
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
      environment: "test", 
      clientKey: clientKey, 
      session: {
        id: sessionId, 
      },
      onPaymentCompleted: (result, component) => {
        console.log("test")
        console.log("onPaymentCompleted", result)
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
