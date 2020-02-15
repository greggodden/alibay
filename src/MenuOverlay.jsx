import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class UnconnectedMenuOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerms: ''
    };
  }

  handleToggleMenu = () => {
    this.props.dispatch({ type: 'toggle-menu' });
  };

  handleLogout = event => {
    event.preventDefault();
    this.props.dispatch({ type: 'logout' });
  };

  handleSearchTerms = event => {
    this.setState({ searchTerms: event.target.value });
  };

  handleSearch = event => {
    event.preventDefault();
    this.props.dispatch({ type: 'toggle-menu' });
    this.props.history.push('/search?query=' + this.state.searchTerms);
  };

  render = () => {
    return (
      <>
        <div
          className={this.props.menuOpen ? 'menuOverlayWrapper menuOpen' : 'menuOverlayWrapper menuClosed'}
          onClick={this.handleToggleMenu}
        ></div>
        <div className={this.props.menuOpen ? 'menuOverlay showMenuOverlay' : 'menuOverlay hideMenuOverlay'}>
          <div className='menuLinks'>
            <div className='menuClose'>
              <img src='/imgs/icoClose.png' className='icoClose' onClick={this.handleToggleMenu} title='Close Menu' />
            </div>
            <div className='menuLink'>
              <NavLink
                to={this.props.loggedIn ? '/listings' : '/login'}
                activeStyle={{ fontWeight: 'bold' }}
                onClick={this.handleToggleMenu}
              >
                Home
              </NavLink>
            </div>
            <div className='menuLink'>
              <NavLink to='/manage-listings' activeStyle={{ fontWeight: 'bold' }} onClick={this.handleToggleMenu}>
                Manage My Listings
              </NavLink>
            </div>
            <div className='menuLink'>
              <NavLink to='/sell-a-record' activeStyle={{ fontWeight: 'bold' }} onClick={this.handleToggleMenu}>
                Sell A Record
              </NavLink>
            </div>
            <div className='menuLink'>
              <Link to='/#' onClick={this.handleLogout}>
                Logout
              </Link>
            </div>
          </div>
          <div className='navMenuSearch'>
            <div className='navSearchIcon'>
              <img className='icoSearch' src='/imgs/icoSearch.png' />
            </div>
            <div className='navSearchForm'>
              <form id='menuSearchForm' encType='multipart/form-data' onSubmit={this.handleSearch}>
                <input
                  className='formInput formSearch'
                  placeholder='Search...'
                  type='text'
                  onChange={this.handleSearchTerms}
                ></input>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  };
}

const mapStateToProps = state => {
  return {
    username: state.username,
    loggedIn: state.loggedIn,
    menuOpen: state.menuOpen
  };
};

let MenuOverlay = withRouter(connect(mapStateToProps)(UnconnectedMenuOverlay));
export default MenuOverlay;
