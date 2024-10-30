## Advanced Flow
I completed the challenges below on the `src > dropin > dropin.js` file to better understand how the Adyen web drop-in interacts with the [Advanced Flow](https://docs.adyen.com/online-payments/build-your-integration/advanced-flow/?platform=Web&integration=Drop-in&version=6.3.0) using Adyen's [Checkout API](https://docs.adyen.com/api-explorer/).

- [x] Make the `billingAddress` field required for the card payment method in the drop-in.
- [x] Make US and Canada the only available option for country.
- [x] Show the card holder name field and make it required.
- [x] Customize the pay button:
    - [x] Change the color of the pay button to hex code `#0abf53`.
    - [x] Make the text weight 900.
    - [x] Customize the text in the payment button to say “Ecom is Great” rather than “Pay”.
- [x] Set up a gift card configuration object:
    - [x] First, setup a `genericgiftcard` with `TestPmmAcquirerAccount` on your merchant account.
    - [x] Change the icon.
    - [x] Change the presented name of the gift card.
- [x] Customize the order of the brands in the card payment method of the drop-in:
    - [x] Order the brands as follows: `maestro, discover, amex, mc, visa`.
    - [x] Make `visa` the only allowed payment method (without deactivating the others).
- [x] Store a payment method using the drop-in and the card configuration.
    - [x] In another transaction, make the stored payment method appear.
    - [x] Complete another payment with the stored payment method.
    - [x] Find raw request in logs.
