require('normalize.css');
require('styles/App.css');
require('styles/NoteList.less');
require('styles/Registration.less');

window.jQuery = require('../../node_modules/jquery/dist/jquery.min.js')
require('../../node_modules/bootstrap/dist/js/bootstrap.min.js');

import React from 'react';
import Navbar from './Navbar';

var App = React.createClass({
  render() {
    return (
      <div>
        <Navbar></Navbar>
        {this.props.children || "Waiting"}
      </div>
    );
  }
});

module.exports = App;
