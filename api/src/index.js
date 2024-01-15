const express = require("express");
const app = express();
const { v4: uuidv4 } = require('uuid');
const { getGoogleSheetClient, writeGoogleSheet } = require('./googlesheets.js');
require('dotenv').config();

const cors = require('cors');
const corsOptions = {
  origin: ['http://localhost:5173', 'https://traitlets-fe.onrender.com', 'https://traitlets.onrender.com','https://traitlets.shop'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
// Enable CORS for the specified origin
app.use(cors(corsOptions));

// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SK);
const endpointSecret = process.env.ENDPOINT_SECRET;

let braceletDetails

// Webhook needs express to process the body raw, so no 'app.use()' can go before this definition
app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  console.log('Webhook called');
  let event;
  console.log("webhook braceletDetails", braceletDetails)

  if (endpointSecret) {
    console.log("endpoint secret found")
    // Get the signature sent by Stripe
    const signature = request.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.sendStatus(400);
    }
  }
  else {
    console.log("No endpoint secret")
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log("PaymentIntent succeeded");
      updateGoogleSheet(paymentIntent.amount, braceletDetails || null, paymentIntent)
      break;
    case 'payment_intent.created':
      console.log(`PaymentIntent creation successful!`);
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.json({received: true});
});

// Payment intent needs express to process the body as a json object
app.use(express.json());
app.post("/create-payment-intent", async (req, res) => {
  console.log("Req", req.body)
  console.log("Req body", req.body)
  braceletDetails = req.body?.braceletDetails?.braceletDetails
  console.log("intent BD", braceletDetails)
  // Single-sided product id
  const productId = process.env.PRODUCT_ID;

  try {
    const productPrice = await calculateOrderAmount(productId);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: productPrice,
      currency: "cad",
      automatic_payment_methods: {
        enabled: true,
      }
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
        productPrice: productPrice/100,
      });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

  async function updateGoogleSheet(productPrice, braceletDetails, paymentIntent) {
    // Append order data to Google Spreadsheet
    let orderData
    if(braceletDetails){
        const orderId = uuidv4();
        const productId = 'Single Design'
        orderData = [
            new Date().toISOString(), 
            productId, 
            (productPrice / 100),
            paymentIntent.id,
            orderId,
            paymentIntent.shipping.name,
            paymentIntent.receipt_email || '',
            paymentIntent.shipping.phone,
            paymentIntent.shipping.address.city,
            paymentIntent.shipping.address.country,
            paymentIntent.shipping.address.line1,
            paymentIntent.shipping.address.line2 || '',
            paymentIntent.shipping.address.postal_code,
            paymentIntent.shipping.address.state,
            braceletDetails['base-beads']['name'],
            braceletDetails['base-beads']['name'] || '',
            braceletDetails['centerpiece']['front-side']['type'] || '',
            braceletDetails['centerpiece']['front-side']['design'] || '',
            braceletDetails['centerpiece']['back-side']['type'] || '',
            braceletDetails['centerpiece']['back-side']['design'] || '',
            braceletDetails['size'],
        ];
        console.log("Bracelet details received")

    }
    else{
        console.error("braceletDetails not received")
    }
    console.log("before client")
    const googleSheetClient = await getGoogleSheetClient();
    console.log("client got")
    await writeGoogleSheet(googleSheetClient, orderData);
  }

// Function to retrieve the product price from Stripe using the product ID
const getProductPrice = async (productId) => {
  try {
    const product = await stripe.products.retrieve(productId);
    const price = await stripe.prices.list({ product: product.id, limit: 1 });
    return price.data[0].unit_amount;
  } catch (error) {
    console.error("Error retrieving product price:", error);
    throw new Error("Error retrieving product price");
  }
};

const calculateOrderAmount = async (productId) => {
  try {
    // Replace this constant with a dynamic calculation of the order's amount
    const productPrice = await getProductPrice(productId);
    return productPrice;
  } catch (error) {
    console.error("Error calculating order amount:", error);
    throw new Error("Error calculating order amount");
  }
};

app.listen(4242, () => console.log("Node server listening on port 4242!"));
