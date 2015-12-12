require('normalize.css');
require('styles/App.css');

import React from 'react';
import Registration from './Registration';

class AppComponent extends React.Component {
  render() {
    return (
      <div>
        <nav className='navbar navbar-default'>
          <div className='container-fluid'>
            <ul className='nav navbar-nav'>
              <li>graynote</li>
              <li>List Notes</li>
              <li>New Note</li>
              <li>Search Bar</li>
              <li>Loading</li>
              <li>Log In</li>
              <li>Log Out</li>
            </ul>
          </div>
        </nav>
        <div className='container-fluid'>
          <Registration></Registration>
        </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
