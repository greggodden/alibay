import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class UnconnectedLogin extends Component {
  constructor() {
    super();
    this.state = {
      usernameInput: '',
      passwordInput: ''
    };
  }

  componentDidMount = () => {
    if (this.props.loggedIn) {
      this.props.history.push('/');
    }
  };

  handleUsernameChange = event => {
    this.setState({ usernameInput: event.target.value });
  };

  handlePasswordChange = event => {
    this.setState({ passwordInput: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const username = this.state.usernameInput;
    const data = new FormData();
    data.append('username', username);
    data.append('password', this.state.passwordInput);
    const response = await fetch('/login', { method: 'POST', body: data });
    let body = await response.text();
    body = JSON.parse(body);
    if (!body.success) {
      window.alert(body.message);
      this.setState({ usernameInput: '', passwordInput: '' });
      return;
    }
    this.props.dispatch({ type: 'login-success', payload: username });
    this.props.history.push('/listings');
  };

  render = () => {
    return (
      <div className='wrapper'>
        <div className='formContainer'>
          <div>
            <h1 className='brand'>
              33
              <span className='third'>
                <sup>1</sup>/<sub>3</sub>
              </span>{' '}
              Records
            </h1>
            <form onSubmit={this.handleSubmit} encType='multipart/form-data'>
              <div className='formContents'>
                <input
                  className='formInput'
                  type='text'
                  onChange={this.handleUsernameChange}
                  placeholder='username'
                  value={this.state.usernameInput}
                  required
                />
                <input
                  className='formInput'
                  type='password'
                  onChange={this.handlePasswordChange}
                  placeholder='password'
                  value={this.state.passwordInput}
                  required
                />
              </div>
              <button className='btnPrimary formSubmit btnLoginSignup' type='submit' value='login'>
                Login
              </button>
            </form>
            <div className='formSubCopy'>
              Don't have an account? <Link to='/sign-up'>Sign-Up</Link>
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
    loggedIn: state.loggedIn
  };
};

let Login = connect(mapStateToProps)(UnconnectedLogin);
export default withRouter(Login);
