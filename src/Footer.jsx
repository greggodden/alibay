import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class UnconnectedFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLogout = () => {
    this.props.dispatch({ type: 'logout' });
    console.log('user has been logged out');
  };

  render = () => {
    if (!this.props.loggedIn) {
      return <></>;
    }
    return (
      <div className='footerWrapper'>
        <div className='footerContainer'>
          <div className='footerLogo'>
            <h1>
              <Link to={this.props.loggedIn ? '/listings' : '/login'}>
                33
                <span className='third'>
                  <sup>1</sup>/<sub>3</sub>
                </span>{' '}
                Records
              </Link>
            </h1>
          </div>
          <div className='footerLinks'>
            <div className='footerLink'>
              <Link to={this.props.loggedIn ? '/listings' : '/login'}>Home</Link>
            </div>
            <div className='footerLink'>
              <NavLink to='/sell-a-record' activeStyle={{ fontWeight: 'bold' }}>
                Sell A Record
              </NavLink>
            </div>
            <div className='footerLink'>
              <Link to='/#' onClick={this.handleLogout}>
                Logout
              </Link>
            </div>
          </div>
          <div className='footerDisclaimer'>&copy; 2020 33 1/3 Records Inc.</div>
        </div>
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

let Footer = connect(mapStateToProps)(UnconnectedFooter);
export default Footer;
