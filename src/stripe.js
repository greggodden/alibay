const stripe = require('stripe')('sk_test_pUQ2R1mt3svOb5yCO02f0Lwn00x5dehwab');

async function postCharge(req, res) {
  try {
    const { amount, source, receipt_email } = req.body;

    const charge = await stripe.charges.create({
      amount,
      currency: 'cad',
      source,
      receipt_email
    });

    if (!charge) throw new Error('charge unsuccessful');

    res.status(200).json({
      message: 'charge posted successfully',
      charge
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

module.exports = postCharge;
