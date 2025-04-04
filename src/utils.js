// Original setReturnUrl function
// function setReturnUrl() {
//   if (window.location.pathname === "/sessions/" || "/dropin/") {
//     return window.location.href;
//   } else {
//     return "https://your-company.com/";
//   }
// }

// Update return address to redirect 3DS to adyen
function setReturnUrl() {
  if (window.location.pathname === "/sessions/" || "/dropin/") {
    // return window.location.href;
    return "https://www.adyen.com/";
  } else {
    return "https://your-company.com/";
  }
}

// Add shopperReference for stored cards 
// https://docs.adyen.com/payment-methods/cards/web-component/?tab=store-card-details-payment-methods_2#stored-card-payments  
const paymentMethodsConfig = {
  shopperReference: "enabled test", // required for storing card details
  reference: Math.random(),
  countryCode: "US",
  shopperLocale: "en-US",
  amount: {
    value: 7834,
    currency: "USD",
  },
};

const paymentsDefaultConfig = {
  shopperReference: "enabled test", // required for storing card details
  reference: "enabled test",
  recurringProcessingModel: "CardOnFile",
  countryCode: "US",
  channel: "Web",
  returnUrl: setReturnUrl(),
  amount: {
    value: 1000,
    currency: "USD",
  },
  lineItems: [
    {
      id: "1",
      description: "Test Item 1",
      amountExcludingTax: 10000,
      amountIncludingTax: 11800,
      taxAmount: 1800,
      taxPercentage: 1800,
      quantity: 1,
      taxCategory: "High",
    },
  ],

  //** ENABLE 3DS2 */ 
  // Drop-in version must be 4.10.2 or later.
  // Troubleshooting: https://docs.adyen.com/online-payments/3d-secure/native-3ds2/?platform=iOS&integration=Drop-in&version=5.0.0+and+later#troubleshooting
  // If channel: "web" is missing, it will throw a 422 error (this parameter is above)

  // authenticationData.threeDSRequestData.nativeThreeDS is set to preferred if you use Checkout API v69 or later
  // authenticationData: {
  //   threeDSRequestData: {
  //     nativeThreeDS: "preferred"
  //   }
  // },

  // additionalData.allow3DS2 is set to true if you use Checkout API v68 or earlier.
  additionalData: {
    allow3DS2: true, // Enables 3DS Native Flow for earlier versions
    executeThreeD: true,
    threeDSRequestorChallengeInd: "04"
  }
};

// Generic POST Helper
const httpPost = (endpoint, data) =>
  fetch(`/${endpoint}`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());

// Get all available payment methods from the local server
const getPaymentMethods = () =>
  httpPost("paymentMethods", paymentMethodsConfig)
    .then((response) => {
      if (response.error) throw "No paymentMethods available";
      // console.log('Response', response);
      return response;
    })
    .catch(console.error);

// Posts a new payment into the local server
const makePayment = (paymentMethod, config = {}) => {
  const paymentsConfig = { ...paymentsDefaultConfig, ...config };
  const paymentRequest = { ...paymentsConfig, ...paymentMethod };

  return httpPost("payments", paymentRequest)
    .then((response) => {
      if (response.error) throw "Payment initiation failed";
      return response;
    })
    .catch(console.error);
};

// Make payments/details call
const submitDetails = (details) => {
  return httpPost("payments/details", details)
    .then((response) => {
      return response;
    })
    .catch(console.error);
};

// Fetches an originKey from the local server
const getOriginKey = () =>
  httpPost("originKeys")
    .then((response) => {
      if (response.error || !response.originKeys)
        throw "No originKey available";

      return response.originKeys[Object.keys(response.originKeys)[0]];
    })
    .catch(console.error);

// Fetches a clientKey from the
const getClientKey = () =>
  httpPost("clientKeys")
    .then((response) => {
      if (response.error || !response.clientKey) throw "No clientKey available";

      return response.clientKey;
    })
    .catch(console.error);

// Make the /sessions call (for CHECKOUT SDK)
const makeSessionsCall = () => {
  return httpPost("webSdk")
    .then((response) => {
      // console.log(response);
      return response;
    })
    .catch(console.error);
};

// ------------------------------------------------SESSIONS FUNCTIONS START HERE ------------------------------------------------

// Makes the /session call (for Drop-in)

const sessionsDropin = (paymentMethod, config = {}) => {
  const paymentsConfig = { ...paymentsDefaultConfig, ...config };
  const sessionRequest = { ...paymentsConfig, ...paymentMethod };

  return httpPost("sessions", sessionRequest)
    .then((response) => {
      if (response.error) throw "Payment initiation failed";
      return response;
    })
    .catch(console.error);
};

// Makes the optional /payments call for sessions

const makePayments = (paymentMethod, config = {}) => {
  const paymentsConfig = { ...paymentsDefaultConfigForSession, ...config };
  const paymentRequest = { ...paymentsConfig, ...paymentMethod };

  return httpPost("makePayment", paymentRequest)
    .then((response) => {
      // console.log(response);
      if (response.error) throw "Payment initiation failed";
      return response;
    })
    .catch(console.error);
};

const paymentsDefaultConfigForSession = {
  merchantAccount: "AlexIordachescu",
  reference: Math.random(),
  countryCode: paymentMethodsConfig.countryCode,
  channel: "Web",
  shopperEmail: "adyen@adyen.com",
  dateOfBirth: "1985-07-30",
  shopperName: {
    firstName: "Alex",
    lastName: "Iordachescu",
  },
  paymentMethod: "ideal",
  shopperReference: Math.random(),
  shopperLocale: "en-US",
  billingAddress: {
    city: "Lupoaica",
    country: "GB",
    houseNumberOrName: "N/A",
    postalCode: "N/A",
    street: "461 Rue du Centenaire",
  },
  deliveryAddress: {
    city: "UGINE",
    country: "FR",
    houseNumberOrName: "0",
    postalCode: "73400",
    street: "461 Rue du Centenaire",
  },
  origin: "http://localhost:3000",
  telephoneNumber: "+33 1 76 35 07 90",
  amount: {
    value: 30000,
    currency: "EUR",
  },
  storePaymentMethod: true,
  lineItems: [
    {
      id: "1",
      description: "Test Item 1",
      amountExcludingTax: 10000,
      amountIncludingTax: 11800,
      taxAmount: 1800,
      taxPercentage: 1800,
      quantity: 1,
      taxCategory: "High",
    },
  ],
  additionalData: {
    allow3DS2: true,
  },
};
