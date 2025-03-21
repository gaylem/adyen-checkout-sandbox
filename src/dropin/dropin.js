getClientKey().then(clientKey => {
  getPaymentMethods().then(async paymentMethodsResponse => {
    // console.log('paymentMethodsResponse', paymentMethodsResponse);

    // You can change the component titles using a loop
    // You can also change them with the "name" property on the component configuration objects (ex: cardConfiguration, giftcardConfiguration, etc.)
    // const modifyComponentTitles = () => {
    //   const paymentMethodsArray = paymentMethodsResponse.paymentMethods;

    //   for (const prop of paymentMethodsArray) {
    //     if (prop.name == 'Generic GiftCard') {
    //       prop.name = "Gayle's Gift Card";
    //     }
    //     if (prop.name == 'Credit Card') {
    //       prop.name = 'CREDIT CARD';
    //     }
    //   }
    //   console.log('paymentMethodsArray', paymentMethodsArray);
    // };

    // modifyComponentTitles();

    /**
     * Translations for various UI elements.
     *
     * In v5, you can update labels placeholder texts using translations:
     * https://github.com/Adyen/adyen-web/blob/v5.12.0/packages/lib/src/language/locales/en-US.json
     * In v6, there are properties on the paymentMethodsConfiguration object:
     * https://docs.adyen.com/online-payments/build-your-integration/sessions-flow/?platform=Web&integration=Drop-in&version=6.4.0#localization
     * https://github.com/Adyen/adyen-web/blob/main/packages/server/translations/en-US.json
     *
     * @type {Object}
     */
    const translations = {
      // The properties below change the default values
      'en-GB': {
        'creditCard.numberField.placeholder': '27771800 979 1000010 8'
        // 'select.stateOrProvince': 'Choose State or Province',
        // payButton: 'Ecom is Great',
        // storeDetails: 'Save my card for later',
        // 'creditCard.holderName': "What's your name?",
        // billingAddress: "What's your billing address?",
        // 'creditCard.holderName': 'Name on your credit card',
        // 'creditCard.holderName.placeholder': 'Gayle Martin',
        // 'creditCard.numberField.title': 'Your card number',
        // 'creditCard.numberField.placeholder': '666',
        // 'creditCard.expiryDateField.title': 'Expiration Date',
        // 'creditCard.expiryDateField.placeholder': 'Month/Year',
        // billingAddress: 'Your billing address',
        // street: 'Street',
        // stateOrProvince: 'State',
        // country: 'Your country',
        // houseNumberOrName: 'Unit number',
      },
    };

    // https://docs.adyen.com/payment-methods/cards/custom-card-integration/#default-style
    // const ariaLabelsObject = {
    //   lang: 'en-GB',
    //   encryptedCardNumber: {
    //     label: 'I changed this',
    //     iframeTitle: 'I changed this',
    //   },
    //   encryptedExpiryDate: {
    //     label: 'I changed this, too',
    //     iframeTitle: 'I changed this, too',
    //   },
    //   encryptedSecurityCode: {
    //     label: 'Iframe for card data input field',
    //   },
    // };

    // Define style object for cardConfiguration
    // https://docs.adyen.com/payment-methods/cards/custom-card-integration/#default-style
    // const stylesObject = {
    //   base: {
    //     color: 'black',
    //     fontSize: '16px',
    //     fontSmoothing: 'antialiased',
    //     fontFamily: 'Helvetica',
    //   },
    //   error: {
    //     color: 'magenta',
    //   },
    //   placeholder: {
    //     color: '#d8d8d8',
    //   },
    //   validated: {
    //     color: 'green',
    //   },
    // };

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
      onBrand: (event) => {
        console.log("onBrand", event)
      },
      // disclaimerMessage: {
      //   message: "Ved betaling med internationale betalingskort reserveres købsbeløbet på din konto indtil betalingen sker.",
      //   linkText: "",
      //   link: "https://www.yourcompany.com/terms-and-conditions"
      // },
      // installmentOptions: {
      //   card: {
            // Shows 1, 2, and 3 as the numbers of monthly installments that the shopper can choose.
            // values: [1, 2, 3],
            // Shows regular and revolving as plans that the shopper can choose.
            // plans: [ 'regular', 'revolving' ]
        // },
      // Shows payment amount per installment.
      // showInstallmentAmounts: true
      // },
      // brands: ['maestro', 'discover', 'amex', 'mc', 'visa', 'atome'],
      // // brands: ['visa'],
      // brandsConfiguration: {
      //   visa: {
      //     icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV-UrYIzs2u3MPXTvIPUHNbHhH-jdy_Z04Ig&s',
      //   },
      // },
      // // showBrandsUnderCardNumber: true, // v5.12.0 or higher
      // enableStoreDetails: true, // required for storing card details
      // hasHolderName: true,
      // holderNameRequired: true,
      // positionHolderNameOnTop: true,
      // billingAddressRequired: true,
      // // billingAddressAllowedCountries: ['US', 'CA', 'GB'],
      // // configuration: {
      // //   socialSecurityNumberMode: 'show', // Shows SSN field
      // // },
      // styles: stylesObject,
      // ariaLabels: ariaLabelsObject,
      // // name: 'CREDIT CARD COMPONENT', // Updates the name/title of the component
    };

    const achConfiguration = {
      holderNameRequired: true,
      hasHolderName: true, 
      billingAddressAllowedCountries: ['BR'],
    }


    /**
     * Configuration for gift card payments.
     * https://docs.adyen.com/payment-methods/gift-cards/web-drop-in/#configuration
     * @type {Object}
     */
    const giftcardConfiguration = {
      brandsConfiguration: {
        fashioncheque: {
          icon: 'https://s3-eu-west-1.amazonaws.com/tpd/logos/51c5f6a80000640005498748/0x0.png',
          name: "The Fashion Cheque",
        },
      },
    };

     /**
     * Configuration for Twint payments.
     * @type {Object}
     */
     const twintConfiguration = {
      brandsConfiguration: {
        TWINT: {
          icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV-UrYIzs2u3MPXTvIPUHNbHhH-jdy_Z04Ig&s',
        },
      },
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
     */
    const configuration = {
      // openFirstPaymentMethod: false,
      openFirstStoredPaymentMethod: true,
      showStoredPaymentMethods: true,
      environment: 'test',
      clientKey: clientKey, // Mandatory. clientKey from Customer Area
      paymentMethodsResponse,
      translations: translations,
      locale: 'en-GB',
      // Update placeholder texts v6: https://docs.adyen.com/online-payments/upgrade-your-integration/migrate-to-web-v6/#update-placeholder-texts
      // Update placeholder texts using translations for v5
      // Put paypal, klarna, configs etc here:
      paymentMethodsConfiguration: {
        ach: achConfiguration,
        card: cardConfiguration,
        giftcard: giftcardConfiguration,
        // giftcard: giftcardConfiguration2,
        twint: twintConfiguration,
        // Adding storedCard here makes the stored payment method show up on the frontend
        // https://docs.adyen.com/payment-methods/cards/web-component/?tab=store-card-details-payment-methods_2#stored-card-payments
        storedCard: {
          hideCVC: true,
        },
      },

      onChange: (state, component) => {
        updateStateContainer(state); // Demo purposes only
        // console.log(state.data)
      },

      onSubmit: (state, dropin) => {
        console.log("onSubmit", state)
        // makePayment is a utility function
        makePayment(state.data)
          .then(response => {
            dropin.setStatus('loading');
            if (response.action) {
              // Response.action contains redirect url
              dropin.handleAction(response.action);
            } else if (response.resultCode === 'Authorised') {
              dropin.setStatus('success', { message: 'Payment successful!' });
              // setTimeout(function () {
              //   dropin.setStatus('ready');
              // }, 2000);
            } else if (response.resultCode !== 'Authorised') {
              dropin.setStatus('error', { message: 'Oops, try again please!' });
              setTimeout(function () {
                dropin.setStatus('ready');
              }, 2000);
            }
          })
          .catch(error => {
            throw Error(error);
          });
      },

      onAdditionalDetails: (state, dropin) => {
        console.log("state", state);
        submitDetails(state.data) 
          .then(response => {
            console.log('onAdditionalDetails response: ', response);
            if (response.action) {
              dropin.handleAction(response.action);
            } else if (response.resultCode === 'Authorised') {
              dropin.setStatus('success', { message: 'Payment successful!' });
              setTimeout(function () {
                dropin.setStatus('ready');
              }, 2000);
            } else if (response.resultCode !== 'Authorised') {
              setTimeout(function () {
                dropin.setStatus('ready');
              }, 2000);
            }
          })
          .catch(error => {
            throw Error(error);
          });
      },

      onPaymentCompleted: (result, component) => {
        console.log("onPaymentCompleted")
        console.info(result, component);
      },

      onPaymentFailed: (result, component) => {
        console.info(result, component);
      },

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
      onActionHandled: action => {
        // Implementation here
      },
    };

    /**
     * Creates an instance of AdyenCheckout from SDK.
     */
    const checkout = await AdyenCheckout(configuration);

    /**
     * Creates and mounts the drop-in payment component.
     * @returns {Object} The mounted drop-in component instance.
     */
    const dropin = checkout
      .create('dropin', {
        /**
         * Callback function triggered when a payment method is selected.
         * @param {Object} activeComponent - The currently active payment component.
         */
        onSelect: activeComponent => {
          if (activeComponent.state && activeComponent.state.data)
            updateStateContainer(activeComponent.data); // Demo purposes only
        },
      })
      .mount('#dropin-container');
  });
});

// Redirect handling code starts here till the end

/**
 * Handles the redirect result after payment processing.
 * @param {string} redirectResult - The redirect result received after payment.
 */
async function handleRedirectResult(redirectResult) {

  // console.log(RedirectComponent.getReturnUrl(context))
  // added async
  const checkout = await AdyenCheckout({
    // changed new to await
    environment: 'test',
    clientKey: clientKey,
    locale: 'en-GB',
  });
  const dropin = checkout
    .create('dropin', {
      setStatusAutomatically: false,
    })
    .mount('#dropin-container');

  // console.log('redirectResult: ', redirectResult);

  // I was able to recreate a 422 error in 3DS by removing redirecResult from the details object in the submitDetails call:

  /* 

  {
    "status": 422,
    "errorCode": "14_002",
    "message": "Required field 'paymentData' is not provided.",
    "errorType": "validation",
    "pspReference": "JK4GXVR9P58TBT65"
  }
  */

  submitDetails({ details: { redirectResult } }).then(response => {
    // console.log('submitDetails response: ', response);
    if (response.resultCode === 'Authorised') {
      document.getElementById('result-container').innerHTML =
        '<img alt="Success" src="https://checkoutshopper-test.adyen.com/checkoutshopper/images/components/success.svg">';
    } else if (response.resultCode !== 'Authorised') {
      document.getElementById('result-container').innerHTML =
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
    .replace(/\?/g, '')
    .split('&')
    .reduce((acc, cur) => {
      const [key, prop = ''] = cur.split('=');
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
