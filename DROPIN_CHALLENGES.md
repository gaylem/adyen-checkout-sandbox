## Advanced Flow
I completed the challenges below on the `src > dropin > dropin.js` file to better understand how the Adyen web drop-in interacts with the [Advanced Flow](https://docs.adyen.com/online-payments/build-your-integration/advanced-flow/?platform=Web&integration=Drop-in&version=6.3.0) using Adyen's [Checkout API](https://docs.adyen.com/api-explorer/). 

Here is a code [walk-through](https://www.youtube.com/watch?v=t1fjcD8UceE&t=1s) to help you get started.

### Card Component
- [x] Make the `billingAddress` field required for the card payment method in the drop-in.
- [x] Make US and Canada the only available option for country.
- [x] Show the card holder name field and make it required.
- [x] Position the card holder name on the top of the form.
- [x] Customize the order of the brands in the card payment method of the drop-in:
    - [x] Order the brands as follows: `maestro, discover, amex, mc, visa`.
    - [x] Make `visa` the only allowed payment method (without deactivating the others).
- [x] Display the card brands under the card number field.
- [x] Replace the `visa` logo with a picture of a cat.
- [x] Add a Social Security number (CPF/CNPJ) field.
- [x] Make the pay button disappear.
- [x] Make the pay button reappear and customize it:
    - [x] Change the color of the pay button to hex code `#0abf53`.
    - [x] Make the text weight 900.
    - [x] Customize the text in the payment button to say “Ecom is Great” rather than “Pay”.
- [ ] Change ‘Name on card’, ‘Card number’, and 'Expiry date' to something else
- [ ] Change 'BILLING ADDRESS' styles and text

### Gift Card Component
- [x] Set up a gift card configuration object:
    - [x] First, setup a `genericgiftcard` payment method with `TestPmmAcquirerAccount` on your merchant account.
    - [x] Change the icon to a picture of a cat.
    - [x] Change the presented name of the gift card.

### Stored Payment Method
- [x] Store a card payment method:
    - [x] In another transaction, make the stored payment method appear.
    - [x] Complete another payment with the stored payment method.
    - [x] Find raw request in logs.
