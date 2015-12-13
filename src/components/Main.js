require('normalize.css');
require('styles/App.css');

import React from 'react';
import Registration from './Registration';
import Note from './Note';
import NoteList from './NoteList';
import UserStore from '../stores/UserStore';
import NoteStore from '../stores/NoteStore';
import NoteActions from '../actions/NoteActions';

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
  handleNewNote() {
    NoteActions.newNote();
  },
  render() {
    return (
      <div>
        <nav className='navbar navbar-default'>
          <div className='container-fluid'>
            <ul className='nav navbar-nav'>
              <li>graynote</li>
              <li>List Notes</li>
              <li><a href='#' onClick={this.handleNewNote} className='btn btn-default'>New Note</a></li>
              <li>Search Bar</li>
              <li>Loading</li>
              <li>Log In</li>
              <li>Log Out</li>
            </ul>
          </div>
        </nav>
        <div className='container-fluid'>
          <Registration></Registration>
          {this.state.note ? <Note token={this.state.token}></Note> : <NoteList token={this.state.token}></NoteList>}
        </div>
      </div>
    );
  }
});

module.exports = App;
