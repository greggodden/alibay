import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Nav from './Nav.jsx';
import Footer from './Footer.jsx';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import Listings from './Listings.jsx';
import Error from './Error.jsx';
import SellARecord from './SellARecord.jsx';
import Record from './Record.jsx';
import Seller from './Seller.jsx';
import SearchResults from './SearchResults.jsx';
import ManageListings from './ManageListings.jsx';
import Checkout from './Checkout.jsx';

class UnconnectedApp extends Component {
  constructor() {
    super();
    this.state = {
      username: undefined,
      cookiesExist: false
    };
  }

  componentDidMount = async () => {
    const response = await fetch('/check-cookies');
    let body = await response.text();
    body = JSON.parse(body);
    console.log('body is:', body);
    if (body.success) {
      this.setState({ ...this.state, cookiesExist: true });
      console.log('didMountCookiesExists:', this.state.cookiesExist);
      this.props.history.push('/login');
      return;
    }
    console.log('didMountCookiesExist:', this.state.cookiesExist);
    this.props.history.push('sign-up');
  };

  setUsername = username => {
    this.setState({ ...this.state, username: username });
  };

  renderOnLoad = () => {
    if (this.state.cookiesExist) {
      console.log('renderCookiesExist:', this.state.cookiesExist);
      this.props.history.push('/login');
    }
    console.log('renderCookiesExist:', this.state.cookiesExist);
    this.props.history.push('/sign-up');
  };

  renderSignUp = () => {
    return <SignUp />;
  };

  renderLogin = () => {
    return <Login />;
  };

  renderListings = () => {
    return <Listings />;
  };

  renderSellARecord = () => {
    return <SellARecord />;
  };

  renderRecord = props => {
    return <Record rid={props.match.params.rid} />;
  };

  renderSeller = props => {
    return <Seller name={props.match.params.username} />;
  };

  renderSearchResults = props => {
    return <SearchResults location={props.location} />;
  };

  renderManageListings = () => {
    return <ManageListings name={this.props.username} />;
  };

  renderCheckout = () => {
    return <Checkout />;
  };

  render404 = () => {
    return <Error />;
  };

  render = () => {
    return (
      <>
        <Nav crateCount={this.props.crateCount} />
        <Switch>
          <Route exact={true} path='/' render={this.renderOnLoad} />
          <Route exact={true} path='/sign-up' render={this.renderSignUp} />
          <Route exact={true} path='/login' render={this.renderLogin} />
          <Route exact={true} path='/listings' render={this.renderListings} />
          <Route exact={true} path='/sell-a-record' render={this.renderSellARecord} />
          <Route path='/records/:rid' render={this.renderRecord} />
          <Route path='/seller/:username' render={this.renderSeller} />
          <Route path='/search' render={this.renderSearchResults} />
          <Route exact={true} path='/manage-listings' render={this.renderManageListings} />
          <Route exact={true} path='/checkout' render={this.renderCheckout} />
          <Route exact={true} path='/404' render={this.render404} />
          <Route render={this.render404} />
        </Switch>
        <Footer />
      </>
    );
  };
}

let mapStateToProps = state => {
  return {
    username: state.username,
    loggedIn: state.loggedIn,
    crateCount: state.recordsInCrate.length
  };
};

let App = connect(mapStateToProps)(UnconnectedApp);
export default withRouter(App);
