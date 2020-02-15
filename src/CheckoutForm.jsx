import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardNumberElement, CardExpiryElement, CardCvcElement, injectStripe } from 'react-stripe-elements';
import { Link, withRouter } from 'react-router-dom';

class UnconnectedCheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderResponse: undefined,
      receipt: undefined
    };
  }

  handleOrder = async token => {
    const data = new FormData();
    data.append('token', token.id);
    data.append(
      'crateTotal',
      (
        Math.round(
          (this.props.recordsInCrate.reduce((total, { recordPrice }) => total + Number(recordPrice), 0) +
            Number.EPSILON) *
            100
        ) / 100
      )
        .toString()
        .replace('.', '')
    );
    const order = await fetch('/charge', {
      method: 'POST',
      body: data
    });
    let body = await order.text();
    body = JSON.parse(body);
    if (!body.success) {
      return window.alert('Payment failed.');
    }
    this.setState({ ...this.state, orderResponse: body, receipt: body.payload.receipt_url });
    window.alert('Payment successful.');
    this.props.dispatch({ type: 'empty-crate' });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const stripe = this.props.stripe;
    const { token } = await stripe.createToken();
    const order = await this.handleOrder(token);
  };

  render = () => {
    if (!this.props.recordsInCrate.length) this.props.history.push('/');
    return (
      <div className='checkout-form'>
        <p>
          Amount: $
          {Math.round(
            (this.props.recordsInCrate.reduce((total, { recordPrice }) => total + Number(recordPrice), 0) +
              Number.EPSILON) *
              100
          ) / 100}
        </p>
        <form onSubmit={this.handleSubmit}>
          <label>
            Card details
            <CardNumberElement />
          </label>
          <label>
            Expiration date
            <CardExpiryElement />
          </label>
          <label>
            CVC
            <CardCvcElement />
          </label>
          <button type='submit' className='order-button'>
            Pay
          </button>
        </form>
      </div>
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

let CheckoutForm = connect(mapStateToProps)(UnconnectedCheckoutForm);
export default injectStripe(withRouter(CheckoutForm));
