import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class UnconnectedNavContents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerms: ''
    };
  }

  handleMenu = () => {
    this.props.dispatch({ type: 'toggle-menu' });
  };

  handleCrate = () => {
    this.props.dispatch({ type: 'toggle-crate' });
  };

  handleSearchTerms = event => {
    event.preventDefault();
    console.log('value:', event.target.value);
    this.setState({ searchTerms: event.target.value });
    console.log('terms', this.state.searchTerms);
  };

  handleSearch = event => {
    event.preventDefault();
    console.log('handling search:', this.state.searchTerms);
    this.props.history.push('/search?query=' + this.state.searchTerms);
  };

  render = () => {
    return (
      <div className='navWrapper'>
        <div className='navContainer'>
          <div className='navLogo'>
            <h1 className='navBrand'>
              <Link to={this.props.loggedIn ? '/listings' : '/login'}>
                33
                <span className='third'>
                  <sup>1</sup>/<sub>3</sub>
                </span>{' '}
                Records
              </Link>
            </h1>
          </div>
          <div className='navSearch'>
            <div className='navSearchIcon'>
              <img className='icoSearch' src='/imgs/icoSearch.png' />
            </div>
            <div className='navSearchForm'>
              <form id='navSearchForm' encType='multipart/form-data' onSubmit={this.handleSearch}>
                <input
                  className='formInput formSearch'
                  placeholder='Search...'
                  type='text'
                  onChange={this.handleSearchTerms}
                ></input>
              </form>
            </div>
          </div>
          <div className='navLinks'>
            <div className='navSell navLink'>
              <Link to='/sell-a-record' title='Sell A Record'>
                <img className='icoRecord' src='/imgs/icoRecord.png' />
              </Link>
            </div>
            <div className='navCrate navLink'>
              <div className='navCrateContainer' onClick={this.handleCrate}>
                <div className='navCrateCount'>{this.props.crateCount}</div>
              </div>
              <img className='icoCrate' src='/imgs/icoCrate.png' onClick={this.handleCrate} />
            </div>
            <div className='navMenu navLink'>
              <img className='icoMenu' src='/imgs/icoMenu.png' onClick={this.handleMenu} title='Open Menu' />
            </div>
          </div>
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

let NavContents = withRouter(connect(mapStateToProps)(UnconnectedNavContents));
export default NavContents;
