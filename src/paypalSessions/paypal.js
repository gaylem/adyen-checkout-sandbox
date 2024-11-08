sessionsDropin().then((session) => {
  initSession();
  async function initSession() {

    const paypalConfiguration = {
      isExpress: true,
      clientKey: "test_M35ZRWIW6JHMPOLIAJELF2OYEYIKZQEP",
      environment: "test",
      session,
      onChange: (state, component) => {
        updateStateContainer(state); // Demo purposes only
      },
      onPaymentCompleted: (result, component) => {
        console.info(result, component);
        updateResponseContainer(result);
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
      onError: (error, component) => {
        console.error(error.name, error.message, error.stack, component);
        updateResponseContainer(response.message);
      },
      style: { // Optional configuration for PayPal payment buttons.
        layout: "vertical",
        color: "blue"
      },
      ariaLabel: "Test Label"
    }

    const checkout = await AdyenCheckout(paypalConfiguration);

    const paypalComponent = checkout
      .create("paypal", paypalConfiguration)
      .mount("#paypal-container");
  }
});
