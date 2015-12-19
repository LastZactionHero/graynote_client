require('normalize.css');
require('styles/App.css');
require('styles/NoteList.less');

window.jQuery = require('../../node_modules/jquery/dist/jquery.min.js')
require('../../node_modules/bootstrap/dist/js/bootstrap.min.js');

import React from 'react';
import Registration from './Registration';
import Note from './Note';
import Navbar from './Navbar';
import NoteList from './NoteList';
import UserStore from '../stores/UserStore';
import NoteStore from '../stores/NoteStore';

var App = React.createClass({
  getInitialState() {
    return UserStore.getState();
  },
  componentDidMount(){
    UserStore.listen(this.onChange);
    NoteStore.listen(this.onChange);
  },
  componentWillUnmount() {
    UserStore.unlisten(this.onChange);
    NoteStore.listen(this.onChange);
  },
  onChange(state) {
    this.setState(state)
  },
  render() {
    return (
      <div>
        <Navbar></Navbar>
        <div className='container-fluid'>
          <Registration></Registration>
          {this.state.note ? <Note token={this.state.token}></Note> : <NoteList token={this.state.token}></NoteList>}
        </div>
      </div>
    );
  }
});

module.exports = App;
