getClientKey().then(clientKey => {
    getPaymentMethods().then(async paymentMethodsResponse => {
      console.log('paymentMethodsResponse', paymentMethodsResponse);

      const { AdyenCheckout, Dropin } = window.AdyenWeb;

      const checkout = await AdyenCheckout({
        countryCode: 'US',
        environment: 'test',
        clientKey: clientKey, 
        paymentMethodsResponse,
        locale: 'en-US',
  
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

        onActionHandled: action => {
          // Implementation here
        },
      });

      // Creates and mounts the drop-in payment component.
      const dropin = new Dropin(checkout, {
          paymentMethodsConfiguration: {
            card: {
              placeholders: { cardNumber: 'Enter your card number here' }
            }
          },
          onSelect: activeComponent => {
            if (activeComponent.state && activeComponent.state.data)
              updateStateContainer(activeComponent.data); // Demo purposes only
          },
        })
        .mount('#dropin-container');
    });
  });
  
  // Redirect handling code starts here till the end
  
  async function handleRedirectResult(redirectResult) {

    const checkout = await AdyenCheckout({
      environment: 'test',
      clientKey: clientKey,
      locale: 'en-GB',
    });
    const dropin = checkout
      .create('dropin', {
        setStatusAutomatically: false,
      })
      .mount('#dropin-container');
  
    submitDetails({ details: { redirectResult } }).then(response => {
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
  