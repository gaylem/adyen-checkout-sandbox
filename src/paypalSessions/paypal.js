/**
 * sessionsDropin is a utility function that makes the /sessions request to retrieve
 * payment methods for the PayPal integration.
 *
 * @returns {Promise<Object>} A promise that resolves to the session data.
 */
sessionsDropin().then(session => {
  /**
   * Initializes the PayPal session, configures the PayPal button, and handles
   * the state changes, payment completion, and errors.
   *
   * @async
   * @function
   * @returns {Promise<void>} A promise that resolves when the PayPal component is initialized.
   */
  initSession();

  /**
   * Function to initialize the PayPal session configuration, including event handlers
   * for onChange, onPaymentCompleted, and onError.
   *
   * @async
   * @function
   * @returns {Promise<void>} Resolves when the PayPal button is mounted on the page.
   */
  async function initSession() {
    /**
     * Configuration object for the PayPal payment integration.
     *
     * @typedef {Object} PayPalConfiguration
     * @property {boolean} isExpress - Determines whether to use PayPal Express.
     * @property {string} clientKey - The client key used for authentication.
     * @property {string} environment - The environment in which PayPal is running (e.g., 'test').
     * @property {Object} session - The session object obtained from the sessionsDropin function.
     * @property {Function} onChange - Event handler for when the state of the PayPal component changes.
     * @property {Function} onPaymentCompleted - Event handler for when the payment is completed.
     * @property {Function} onError - Event handler for when an error occurs in the PayPal component.
     * @property {Object} style - Style configuration for the PayPal button.
     */
    const paypalConfiguration = {
      isExpress: true,
      clientKey: 'test_M35ZRWIW6JHMPOLIAJELF2OYEYIKZQEP',
      environment: 'test',
      session,
      onChange: (state, component) => {
        updateStateContainer(state); // Demo purposes only
      },
      onPaymentCompleted: (result, component) => {
        console.info(result, component);
        updateResponseContainer(result);
        const paymentResult = result.resultCode;
        if (paymentResult === 'Authorised' || paymentResult === 'Received') {
          document.getElementById('result-container').innerHTML =
            '<img alt="Success" src="https://checkoutshopper-test.adyen.com/checkoutshopper/images/components/success.svg">';
        } else {
          document.getElementById('result-container').innerHTML =
            '<img alt="Error" src="https://checkoutshopper-test.adyen.com/checkoutshopper/images/components/error.svg">';
        }
        updateResponseContainer(result);
      },
      onError: (error, component) => {
        console.error(error.name, error.message, error.stack, component);
        updateResponseContainer(response.message);
      },
      style: {
        // Optional configuration for PayPal payment buttons.
        layout: 'vertical',
        color: 'blue',
      },
      ariaLabel: 'Test Label',
    };

    /**
     * Creates and mounts the PayPal component on the page.
     *
     * @returns {Promise<void>} Resolves when the PayPal component is mounted.
     */
    const checkout = await AdyenCheckout(paypalConfiguration);

    const paypalComponent = checkout
      .create('paypal', paypalConfiguration) // Create the PayPal component
      .mount('#paypal-container'); // Mount the component to the specified DOM element
  }
});
