import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class UnconnectedSignUp extends Component {
  constructor() {
    super();
    this.state = {
      usernameInput: '',
      passwordInput: '',
      confirmPasswordInput: ''
    };
  }

  handleUsernameChange = event => {
    this.setState({ usernameInput: event.target.value });
  };

  handlePasswordChange = event => {
    this.setState({ passwordInput: event.target.value });
  };

  handleConfirmPasswordChange = event => {
    this.setState({ confirmPasswordInput: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    if (this.state.confirmPasswordInput !== this.state.passwordInput) {
      window.alert('Passwords do not match.');
      this.setState(...this.state, {
        passwordInput: '',
        confirmPasswordInput: ''
      });
      return;
    }
    const username = this.state.usernameInput;
    const data = new FormData();
    data.append('username', username);
    data.append('password', this.state.passwordInput);
    const response = await fetch('/sign-up', { method: 'POST', body: data });
    let body = await response.text();
    body = JSON.parse(body);
    if (!body.success) {
      console.log('sign-up failed');
      window.alert(body.message);
      this.setState({
        usernameInput: '',
        passwordInput: '',
        confirmPasswordInput: ''
      });
      return;
    }
    console.log('sign-up succesful');
    this.props.dispatch({ type: 'login-success', payload: username });
    this.props.routerData.history.push('/listings');
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
                <input
                  className='formInput'
                  type='password'
                  onChange={this.handleConfirmPasswordChange}
                  placeholder='confirm password'
                  value={this.state.confirmPasswordInput}
                  required
                />
              </div>
              <button className='btnPrimary formSubmit btnLoginSignup' type='submit' value='signup'>
                Sign-Up
              </button>
            </form>
            <div className='formSubCopy'>
              Already a member? <Link to='/login'>Login</Link>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

let SignUp = connect()(UnconnectedSignUp);
export default withRouter(SignUp);
