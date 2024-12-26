## PayPal Challenges

The only real challenge with PayPal is to get it set up so you can run test payments. 

Follow [these instructions](https://docs.adyen.com/payment-methods/paypal/setup-paypal-direct-merchants/#dev-sandbox-accounts), but there are a few caveats:

1. The Personal and Business accounts will already be created for you at https://developer.paypal.com/dashboard/accounts 
2. Save Personal credentials somewhere (this is what you will use when you are testing the checkout flow)
3. Save Business credentials somewhere (this is what you will use when you link your Adyen test account)
4. In the default code in this sandbox, you'll have to add a function to get the client key to the PayPal component