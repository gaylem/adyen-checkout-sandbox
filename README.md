## 👋 This is my personal sandbox for practicing [Adyen](https://www.adyen.com/) integratons! 👋

<!-- ![The Adyen Logo](https://github.com/adyen-examples/.github/raw/main/images/logo.png) -->

<img src="https://github.com/adyen-examples/.github/raw/main/images/logo.png" height="100" alt="The Adyen logo">

If you're looking for the libraries/plugins source code, visit the main [**Adyen GitHub page**](https://github.com/adyen). You can also find example integrations in the [**adyen-examples repo**](https://github.com/adyen-examples/.github/blob/main/profile/README.md).

## 📜 Documentation
* [**Adyen Technical Documentation**](https://docs.adyen.com/)
* [**Adyen API Explorer**](https://docs.adyen.com/api-explorer/)
* [**Adyen Test Cards**](https://docs.adyen.com/development-resources/test-cards/test-card-numbers/)
* [**Adyen Developer YouTube Playlist**](https://www.youtube.com/watch?v=VPpTgsJbIhc&list=PL6agz7H5yEoaS-bF2gIwRwe_ApzqmW_QX)

## 👩‍💻 Challenges

If you'd like to create a sandbox like mine, here's how you can get started:

1. [**Fork and clone**](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo) the [**AdyenCheckoutJS**](https://github.com/adyen-examples/AdyenCheckoutsJS) repo. 
2. Create a free [**Adyen test account**](https://docs.adyen.com/get-started-with-adyen/) and set up your Merchant Account, API Key, and Client Key. Check out this [**YouTube video**](https://www.youtube.com/watch?v=AcYl5X_xEyE&t=146s) for a walk-through.
3. Create a .env file in your repo and add the following variables:
```
MERCHANT_ACCOUNT=YOUR_TEST_MERCHANT_ACCOUNT
CHECKOUT_APIKEY=YOUR_API_KEY
CLIENT_KEY=YOUR_CLIENT_KEY
```
4. If you're using PHP, spin up your server with `./start.sh`. If you're using NodeJS, you'll need to `npm install`. 
4. Open the [**DROPIN_CHALLENGES.md**](https://github.com/gaylem/adyen-checkout-sandbox/blob/main/src/dropin/DROPIN_CHALLENGES.md) file and work through the challenges listed there. 
5. Only reference the solutions in my repo if you get really stuck or want to check your work! 
6. Review the Adyen docs and create your own challenges to better understand payment processing. 
7. More challenges to come!