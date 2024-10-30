
/**
 * Advanced Flow + Web Drop-In
 * https://docs.adyen.com/online-payments/build-your-integration/advanced-flow/?platform=Web&integration=Drop-in
 */

/**
 * Retrieves the client key using utils function and initializes payment methods configuration.
 * @returns {Promise<void>} A promise that resolves when the clientKey is obtained and paymentMethodsResponse is received.
 */
getClientKey().then((clientKey) => {

  /**
   * Handles the payment methods response and sets up configurations.
   * @param {Object} paymentMethodsResponse - The response containing payment methods.
   * @returns {Promise<void>} A promise that resolves when payment methods are obtained.
   */
  getPaymentMethods().then(async (paymentMethodsResponse) => {

    console.log('paymentMethodsResponse', paymentMethodsResponse)

    // Change the component titles
    const modifyComponentTitles = () => {
      const paymentMethodsArray = paymentMethodsResponse.paymentMethods
    
      for (const prop of paymentMethodsArray) {
        if (prop.name == 'Generic GiftCard') {
          prop.name = 'Gayle\'s Gift Card'
        }
        if (prop.name == 'Credit Card') {
          prop.name = 'CREDIT CARD'
        }
      }
      console.log('paymentMethodsArray', paymentMethodsArray)
    }
    
    modifyComponentTitles()
    
    /**
     * Translations for various UI elements.
     * https://docs.adyen.com/online-payments/build-your-integration/sessions-flow/?platform=Web&integration=Components&version=6.3.0#localization 
     * @type {Object}
     */
    // deliveryAddress, stateOrProvince, moreMethods button not working
    const translations = {
      "en-GB": {
        "deliveryAddress": "Send me stuff here",
        "stateOrProvince": "Province",
        "paymentMethods.moreMethodsButton": "More payment methods",
        "payButton": "Ecom is Great",
        "storeDetails": "Save my card for later",
        "name": "boop"
      }
    };

    console.log(translations)

    // QUESTION: How do I change Holder Name, Card number, etc?
    // https://docs.adyen.com/payment-methods/cards/custom-card-integration/#default-style 
    // QUESTION: Not working, should I use translations?
        const ariaLabelsObject = {
          lang: "en-GB",
          encryptedCardNumber: {
              label: "I changed this",
              iframeTitle: "I changed this"
          },
          encryptedExpiryDate: {
              label: "I changed this, too",
              iframeTitle: "I changed this, too"
          },
          encryptedSecurityCode: {
              label: "Iframe for card data input field"
          }
      }

        // Define style object for cardConfiguration
        // https://docs.adyen.com/payment-methods/cards/custom-card-integration/#default-style 
        const stylesObject = {
          base: {
            color: 'black',
            fontSize: '16px',
            fontSmoothing: 'antialiased',
            fontFamily: 'Helvetica'
          },
          error: {
            color: 'magenta'
          },
          placeholder: {
            color: '#d8d8d8'
          },
          validated: {
            color: 'green'
          }
        };

    /** 
     * Configuration for card payments: https://docs.adyen.com/payment-methods/cards/web-component/?tab=advanced-requirements_2#optional-configuration 
     * @type {Object}
     * @property {string[]} brands - List of card brands recognized for payments. Default: ['mc', 'visa', 'amex']
     * Supported card types: https://docs.adyen.com/payment-methods/cards/custom-card-integration/#supported-card-types 
     * @property {Object} brandsConfiguration - Custom icons configuration for different brands.
     * @property {boolean} showBrandIcon - Set to false to not show the brand logo when the card brand has been recognized. Default: true
     * @property {boolean} showBrandsUnderCardNumber - v5.12.0 or later - Shows brand logos under the card number field when the shopper selects the card payment method. Default: true
     * @property {boolean} enableStoreDetails - Set to true to show the checkbox for saving the card details for recurring payments. Default: false
     * @property {boolean} hasHolderName - Indicates if the cardholder name field should be shown. Default: false
     * @property {boolean} holderNameRequired - Indicates if the cardholder name field is required. Default: false 
     * @property {boolean} positionHolderNameOnTop - v4.2.0 or later - Renders the cardholder name field at the top of the payment form. Default: false 
     * @property {boolean} hideCVC - Set to true to hide the CVC field. Default: false
     * @property {string} configuration.socialSecurityNumberMode - v4.2.0 or later - Renders a social security number field. Possible values: show, hide, auto. Default: 'auto'
     * @property {Object} styles - Set a style object to customize the card input fields. 
     * Styling card input fields: https://docs.adyen.com/payment-methods/cards/custom-card-integration/#styling
     * Default styles and labels: https://docs.adyen.com/payment-methods/cards/custom-card-integration/#default-style 
     * @property {boolean} billingAddressRequired - Indicates if billing address fields should be shown and required. Default: false
     * @property {string} billingAddressMode - v5.14.0 or later - If billingAddressRequired is set to true, you can set this to partial to require the shopper's postal code instead of the full address. Default: 'full' if required. 
     * For v5.31.0 or later - When set to partial, you can configure data.country to validate the postal code your shopper enters. 
     * Default: If billingAddressRequired is false: 'none'. If billingAddressRequired is true: 'full'.
     * @property {string[]} billingAddressAllowedCountries - Specify allowed country codes for the billing address. For example, ['US', 'CA', 'BR'].Default: The Country field dropdown menu shows a list of all countries.
     * @property {Object} data - Object that contains placeholder information that you can use to prefill fields. Default: Empty
     * @property {Object} installmentOptions - Options for offering credit card installments. Default for v3.15.0 or later: 'plans: regular'
     * @property {string} minimumExpiryDate - v4.3.0 or later - Error message for dates earlier than specified. Format: mm/yy.
     * @property {boolean} showInstallmentAmounts - v3.15.0 or later - Set to true to show payment amounts per installment. Default: false
     * @property {boolean} autoFocus - Automatically moves focus between fields. Default: true
     * @property {Object} SRConfig - Object for configuring screen reader behavior.
     * @property {boolean} SRConfig.collateErrors - Indicates if all errors in the form are read out after each validation. Default: true
     * @property {boolean} SRConfig.moveFocus - Indicates if focus automatically switches to the first field with an error when the shopper selects the Pay button. Default: false
     * @property {boolean} maskSecurityCode - Set to true to mask the CVV/CVC code when entered. Default: false
     * @property {Object} disclaimerMessage - Object for adding a disclaimer to your Card Component.
     * @property {string} disclaimerMessage.message - Text displayed in the Card Component. 
     * @property {string} disclaimerMessage.linkText - Hyperlink text for the disclaimer. 
     * @property {string} disclaimerMessage.link - Hyperlink destination that opens in a new tab. 
     * @property {number} addressSearchDebounceMs - For address lookup feature, number of milliseconds for debounce of onAddressLookup callback. Default: 300ms.
     */
    const cardConfiguration = {
      brands: ['maestro', 'discover', 'amex', 'mc', 'visa'],
      // brands: ['visa'],
      brandsConfiguration: {
        visa: {
          icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV-UrYIzs2u3MPXTvIPUHNbHhH-jdy_Z04Ig&s'
        }
      },
      showBrandsUnderCardNumber: true, // v5.12.0 or higher
      enableStoreDetails: true, // required for storing card details
      hasHolderName: true,
      holderNameRequired: true,
      positionHolderNameOnTop: true, 
      billingAddressRequired: true,
      billingAddressAllowedCountries: ['US', 'CA'],
      configuration: {
        socialSecurityNumberMode: 'show',
      },
      styles: stylesObject,
      ariaLabels: ariaLabelsObject
    }

    
    /**
     * Configuration for gift card payments. 
     * https://docs.adyen.com/payment-methods/gift-cards/web-drop-in/#configuration 
     * @type {Object}
     */
    const giftcardConfiguration = {
      brandsConfiguration: {
        genericgiftcard: {
            icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV-UrYIzs2u3MPXTvIPUHNbHhH-jdy_Z04Ig&s',
        }
      }
    };

    /**
     * Configuration object for initializing the payment methods.
     * Documentation: https://docs.adyen.com/online-payments/build-your-integration/advanced-flow/?platform=Web&integration=Drop-in&version=6.3.0&programming_language=php#add-drop-in 
     * @param {Object} paymentMethodsResponse - The full /paymentMethods response returned when you get available payment methods. **Required**
     * @param {string} clientKey - A public key linked to your API credential, used for client-side authentication. **Required**
     * @param {string} locale - The shopper's locale, used to set the language rendered in the UI. For a list of supported locales, see Language and localization. **Required**
     * @param {string} countryCode - The shopper's country code, used to filter the list of available payment methods to your shopper. **Required**
     * @param {string} environment - Use 'test' for testing. Change to one of the live environments when ready to accept live payments. **Required**
     * @param {Object} [secondaryAmount] - Shows the payment amount in an additional currency on the Pay button. Must handle currency conversion and set the amount.
     * @param {string} secondaryAmount.currency - The three-character ISO currency code.
     * @param {number} secondaryAmount.value - The amount of the transaction, in minor units.
     * @param {string} [secondaryAmount.currencyDisplay='symbol'] - Sets the currency formatting. Default: 'symbol'.
     * @param {boolean} showPayButton - Shows or hides a Pay Button for each payment method. Defaults to true. If set to false, you must override it in paymentMethodsConfiguration.
     * @param {Object} amount - Amount to be displayed on the Pay Button. Expects an object with the value and currency properties.
     * @param {number} amount.value - The amount of the transaction.
     * @param {string} amount.currency - The currency of the transaction.
     * 
     * Example usage:
     * const configuration = {
     *     openFirstStoredPaymentMethod: true,
     *     showStoredPaymentMethods: true,
     *     environment: "test",
     *     clientKey: clientKey, // Mandatory. clientKey from Customer Area
     *     paymentMethodsResponse,
     *     removePaymentMethods: ["paysafecard", "c_cash"],
     *     translations: translations,
     *     locale: "en-GB",
     *     paymentMethodsConfiguration: {
     *         card: cardConfiguration,
     *         giftcard: giftcardConfiguration
     *     },
     *     secondaryAmount: {
     *         currency: 'EUR',
     *         value: 1000,
     *         currencyDisplay: 'symbol'
     *     },
     *     showPayButton: true,
     *     amount: {
     *         value: 1000,
     *         currency: 'USD'
     *     }
     * };
     */
    const configuration = {
      openFirstPaymentMethod: false,
      openFirstStoredPaymentMethod: true,
      showStoredPaymentMethods: true,
      environment: "test",
      clientKey: clientKey, // Mandatory. clientKey from Customer Area
      paymentMethodsResponse,
      removePaymentMethods: ["paysafecard", "c_cash"],
      translations: translations,
      locale: "en-GB",
      // Put paypal, klarna, etc here
      paymentMethodsConfiguration: {
        card: cardConfiguration,
        giftcard: giftcardConfiguration,
        // Adding storedCard here makes the stored payment method show up on the frontend
        // https://docs.adyen.com/payment-methods/cards/web-component/?tab=store-card-details-payment-methods_2#stored-card-payments   
        storedCard: {
          hideCVC: true,
        }
      },

      /**
       * Called when the shopper provides the required payment details.
       * @param {Object} state - The current state of the payment.
       * @param {Object} component - The component associated with the payment method.
       */
      onChange: (state, component) => { 
        updateStateContainer(state); // Demo purposes only
      },

      /**
       * Event handler for the onSubmit event.
       * 
       * @param {Object} state - The current state of the payment process.
       * @param {Object} dropin - The instance of the Drop-in component.
       * @param {Object} actions - An object containing methods to resolve or reject the payment.
       * @param {Function} actions.resolve - Call this method to resolve the payment, passing the resultCode, action, and order objects (if available) from the API response.
       * @param {Function} actions.reject - Call this method if the /payments request from your server fails or if an unexpected error occurs.
       * 
       * @throws {Error} Throws an error if the payment is unsuccessful or if actions.reject() is called.
       * 
       * This event is triggered when the shopper selects the Pay button and the payment details are valid.
       * This applies only if the `showPayButton` configuration parameter is set to true.
       * It makes a POST /payments request.
       */
      onSubmit: (state, dropin) => {
        // makePayment is a utility function
        makePayment(state.data)
          .then((response) => {
            dropin.setStatus("loading");
            if (response.action) {
              // Response.action contains redirect url
              dropin.handleAction(response.action);
            } else if (response.resultCode === "Authorised") {
              dropin.setStatus("success", { message: "Payment successful!" });
              setTimeout(function () {
                dropin.setStatus("ready");
              }, 2000);
            } else if (response.resultCode !== "Authorised") {
              dropin.setStatus("error", { message: "Oops, try again please!" });
              setTimeout(function () {
                dropin.setStatus("ready");
              }, 2000);
            }
          })
          .catch((error) => {
            throw Error(error);
          });
      },

      /**
       * Event handler for the onAdditionalDetails event.
       * 
       * @param {Object} state - The current state of the payment process.
       * @param {Object} dropin - The instance of the Drop-in component.
       * @param {Object} actions - An object containing methods to resolve or reject the payment.
       * @param {Function} actions.resolve - Call this method to resolve the payment, passing the resultCode, action, and order objects (if available) from the API response.
       * @param {Function} actions.reject - Call this method if the /payments/details request from your server fails or if an unexpected error occurs.
       * 
       * This event is triggered when a payment method requires additional details, such as for native 3D Secure 2 or native QR code payment methods.
       * It makes a POST /payments/details request.
       * 
       * @throws {Error} Throws an error if the payment is unsuccessful or if actions.reject() is called.
       */
      onAdditionalDetails: (state, dropin) => {
        submitDetails(state.data)
          .then((response) => {
            if (response.action) {
              dropin.handleAction(response.action);
            } else if (response.resultCode === "Authorised") {
              dropin.setStatus("success", { message: "Payment successful!" });
              setTimeout(function () {
                dropin.setStatus("ready");
              }, 2000);
            } else if (response.resultCode !== "Authorised") {
              setTimeout(function () {
                dropin.setStatus("ready");
              }, 2000);
            }
          })
          .catch((error) => {
            throw Error(error);
          });
      },

      /**
       * Event handler for when the payment is completed.
       * 
       * @param {Object} result - The result object containing payment details.
       * @param {Object} component - The instance of the payment component.
       * 
       * @example
       * function onPaymentCompleted(result, component) {
       *     console.log('Payment completed successfully:', result);
       *     // Handle successful payment completion
       * }
       */
      onPaymentCompleted: (result, component) => {
        console.info(result, component);
      },

      /**
        * Event handler for when the payment fails.
        * A failed payment has result codes Cancelled, Error, or Refused.
        * 
        * @param {Object} result - The result object containing payment failure details.
        * @param {Object} component - The instance of the payment component.
        * 
        * @example
        * function onPaymentFailed(result, component) {
        *     console.error('Payment failed:', result);
        *     // Handle payment failure (e.g., show an error message to the user)
        * }
        */
      onPaymentFailed: (result, component) => {
        console.info(result, component);
      },

      /**
        * Event handler for when an error occurs in Drop-in.
        * 
        * @param {Error} error - The error object containing details about the error.
        * 
        * @example
        * function onError(error) {
        *     console.error('An error occurred:', error);
        *     // Handle the error (e.g., log it or show a notification to the user)
        * }
        */
      onError: (error, component) => {
        console.error(error.name, error.message, error.stack, component);
      },

      /**
       * Event handler for when an action is handled, such as a QR code or 3D Secure 2 authentication screen.
       * 
       * @param {Object} action - The action object containing details about the action.
       * @param {string} action.type - The type of action triggered (e.g., 'threeDS', 'qr', 'await').
       * @param {string} action.componentType - The type of component that shows the action to the shopper.
       * @param {string} action.actionDescription - A description of the action shown to the shopper.
       * 
       * @example
       * function onActionHandled(action) {
       *     console.log('Action handled:', action);
       *     // Handle the action (e.g., display a QR code or 3D Secure screen)
       * }
       */
      onActionHandled: (action) => {
        // Implementation here
      }
    };

    /**
     * Creates an instance of AdyenCheckout from SDK.
     */
    const checkout = await AdyenCheckout(configuration);

    /**
     * Creates and mounts the drop-in payment component.
     * QUESTION: Why isn't dropin being used? Is it just being used elsewhere?
     * @returns {Object} The mounted drop-in component instance.
     */
    const dropin = checkout
      .create("dropin", {

        /**
         * Callback function triggered when a payment method is selected.
         * @param {Object} activeComponent - The currently active payment component.
         */
        onSelect: (activeComponent) => {
          if (activeComponent.state && activeComponent.state.data)
            updateStateContainer(activeComponent.data); // Demo purposes only
        },
      })
      .mount("#dropin-container");
  });
});

// Redirect handling code starts here till the end

/**
 * Handles the redirect result after payment processing.
 * @param {string} redirectResult - The redirect result received after payment.
 */
function handleRedirectResult(redirectResult) {
  const checkout = new AdyenCheckout({
    environment: "test",
    clientKey: "test_M35ZRWIW6JHMPOLIAJELF2OYEYIKZQEP",
    locale: "en-GB",
  });
  const dropin = checkout
    .create("dropin", {
      setStatusAutomatically: false,
    })
    .mount("#dropin-container");

  submitDetails({ details: { redirectResult } }).then((response) => {
    if (response.resultCode === "Authorised") {
      document.getElementById("result-container").innerHTML =
        '<img alt="Success" src="https://checkoutshopper-test.adyen.com/checkoutshopper/images/components/success.svg">';
    } else if (response.resultCode !== "Authorised") {
      document.getElementById("result-container").innerHTML =
        '<img alt="Error" src="https://checkoutshopper-test.adyen.com/checkoutshopper/images/components/error.svg">';
    }
  });
}

/**
 * Extracts search parameters from the URL.
 * @param {string} [search=window.location.search] - The query string to parse.
 * @returns {Object} An object representing the search parameters.
 */
const getSearchParameters = (search = window.location.search) =>
  search
    .replace(/\?/g, "")
    .split("&")
    .reduce((acc, cur) => {
      const [key, prop = ""] = cur.split("=");
      acc[key] = decodeURIComponent(prop);
      return acc;
    }, {});

const { redirectResult } = getSearchParameters(window.location.search);

/**
 * Handles the redirect result if available.
 */
if (redirectResult) {
  handleRedirectResult(redirectResult);
}
