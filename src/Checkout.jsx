import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StripeProvider, Elements } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm.jsx';

class UnconnectedCheckout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      crateTotal: undefined,
      response: undefined
    };
  }

  render = () => {
    return (
      <StripeProvider apiKey='pk_test_rUhciG1u70wRpYUMcKByTOr300pePAMaYK'>
        <Elements>
          <CheckoutForm />
        </Elements>
      </StripeProvider>
    );
  };
}

const mapStateToProps = state => {
  return {
    username: state.username,
    loggedIn: state.loggedIn,
    menuOpen: state.menuOpen,
    crateOpen: state.crateOpen,
    recordsInCrate: state.recordsInCrate,
    crateCount: state.recordsInCrate.length
  };
};

let Checkout = connect(mapStateToProps)(UnconnectedCheckout);
export default Checkout;
