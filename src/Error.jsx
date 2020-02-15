import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Error extends Component {
  render = () => {
    return (
      <div className='wrapper'>
        <div className='formContainer'>
          <div>
            <h1>404 ERROR</h1>
            <p>
              The page you are looking for is unavilable or no longer exists.
            </p>
            <p>
              Return to the <Link to='/'>Homepage</Link>.
            </p>
          </div>
        </div>
      </div>
    );
  };
}

export default Error;
