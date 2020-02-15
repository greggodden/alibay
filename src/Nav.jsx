import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavContent from './NavContent.jsx';
import MenuOverlay from './MenuOverlay.jsx';
import Crate from './Crate.jsx';

class UnconnectedNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: []
    };
  }

  render = () => {
    if (!this.props.loggedIn) {
      return <></>;
    }
    return (
      <>
        <MenuOverlay />
        <Crate />
        <NavContent />
      </>
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

let Nav = connect(mapStateToProps)(UnconnectedNav);
export default Nav;
