## Google Pay Challenges 

### Set Up Google Pay Payment Method in Customer Area:
1. Go to your Customer Area => Payment Methods => Select Google Pay (googlepay) => Continue
2. Check your merchant account > Continue
3. Acquirer account settings => Select “TestPmmAcquirerAccount” from drop down => Continue
4. Click Complete Setup

### To Test:
1. Add a real credit card to your personal [Google account](https://support.google.com/accounts/answer/9244912?hl=en). Don't worry, it won't be charged because you're in test. 
2. Open an incognito window
3. Spin up the Google Pay test component in your terminal and open localhost 
4. Go to the google pay sessions page
5. Log in with your personal gmail account
6. Use your credit card — You should see “Your payment method won't be charged because you're in a test environment” on the pop up

### Minimum requirements:
* No specific requirements in terms of versions
* Depending on what components/dropin and API version you are using, you will need to adjust your code
* If you are using components and API earlier than 3.13.0 and v64, you will need to add the following configuration object in your code:

![config object](/src/googlepay/config.png)

### What about versions later than 3.13.0 and v64? 
* This is where it gets tricky
* If you are using later versions and add ANY FIELD to the configuration object, then you need to include EVERYTHING
* What happens if you don’t? 

![a horrible error](/src/googlepay/horrible_error.png)

### There are a few things that can cause this horrible error:
* As discussed, merchant is only using one object in the configuration object
* The hardcoded gatewayMerchantId is wrong
* The hardcoded merchantId is wrong
* Merchant hasn’t been fully approved by Google Play
* The domain the merchant is making a payment from is not registered on the Google Pay Business Console 

### Pay By Link
* Google Pay is available on Pay by Link but PBL uses Adyen URLs
* Google Pay doesn’t automatically register those URLs so you have to register them in Google Pay business console (there’s a base URL or something you can give them) 
