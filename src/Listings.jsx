import React, { Component } from 'react';
import { connect } from 'react-redux';
import Records from './Records.jsx';

class UnconnectedListings extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render = () => {
    return <Records />;
  };
}

const mapStateToProps = state => {
  return {
    username: state.username,
    loggedIn: state.loggedIn,
    recordsInCrate: state.recordsInCrate,
    crateCount: state.recordsInCrate.length
  };
};

let Listings = connect(mapStateToProps)(UnconnectedListings);
export default Listings;
