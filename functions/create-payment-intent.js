//domain/.netlify/functions/create-payment-intent
require('dotEnv').config();

const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET);
exports.handler = async function (event, context) {
  if (event.body) {
    const { shippingFee, totalAmount } = JSON.parse(event.body);

    const paymentAmount = () => {
      return shippingFee + totalAmount;
    };

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: paymentAmount(),
        currency: 'usd',
      });
      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: error.message }),
      };
    }
  }
  return {
    statusCode: 200,
    body: 'Create Payment Intent',
  };
};
