// This is your test secret API key.
const stripe = require('stripe')('sk_test_51MUDz1DY6rvKHwx8R3CiOqld6LqkhguDWmkyHrSzYcvZp76CdEHTENowdwuF44oowLcKK0zBFvaUvrfIVQdNWSXF009i7YwSFd');
// Replace this endpoint secret with your endpoint's unique secret
// If you are testing with the CLI, find the secret by running 'stripe listen'
// If you are using an endpoint defined with the API or dashboard, look in your webhook settings
// at https://dashboard.stripe.com/webhooks
const endpointSecret = 'whsec_5e1307eed59647c5c00f01cf4be7a7d0559b9020534c13ff818da96a37238da2';
const express = require('express');
const app = express();

app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  console.log('entrou no webhook')
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

app.listen(4242, () => console.log('Running on port 4242'));