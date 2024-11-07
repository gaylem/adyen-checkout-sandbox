## Advanced Flow
Complete the challenges below on the `src > dropin > dropin.js` file to better understand how 3D Secure with the [Advanced Flow](https://docs.adyen.com/online-payments/build-your-integration/advanced-flow/?platform=Web&integration=Drop-in&version=6.3.0) using Adyen's [Checkout API](https://docs.adyen.com/api-explorer/). 

Make sure you complete the challenges in DROPIN_CHALLENGES.md before you do these.

Here are some videos to help you get started: 
- [The /payments/details call](https://www.youtube.com/watch?v=qZcpgN37mxI&t=2s)
- [Handle the redirectResult and onAdditionalDetails data](https://www.youtube.com/watch?v=E0xwRIaa2Po)

### Challenges
- [ ] Now that you've got you're able to handle the ThreeDS flow, let's try and do some more practice, can you change the flow so that the shopper now redirects our website here at Adyen?
- [ ] One error that we frequently on the /payments/details call is a 422 error. You can find out more about errors here. What do you think causes this error? Are you able to recreate it in your own integration?