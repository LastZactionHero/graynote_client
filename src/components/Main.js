require('normalize.css');
require('styles/App.css');
require('styles/NoteList.less');

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
  handleNewNote(e) {
    e.preventDefault();
    NoteActions.newNote();
  },
  handleListNotes(e) {
    e.preventDefault();
    NoteActions.clearNote();
  },
  render() {
    return (
      <div>
        <nav className='navbar navbar-inverse navbar-fixed-top'>
          <div className='container-fluid'>
            <div className="navbar-header">
              <a className="navbar-brand" href="#">graynote</a>
            </div>
            <ul className='nav navbar-nav'>
              <li><a href='#' onClick={this.handleListNotes}><i className='fa fa-list'></i></a></li>
              <li><a href='#' onClick={this.handleNewNote}><i className='fa fa-plus'></i></a></li>
              <form className="navbar-form navbar-left" role="search">
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Search" />
                </div>
              </form>
            </ul>
            <ul className='nav navbar-nav navbar-right'>
              <li><a href='#'><i className='fa fa-spinner'></i></a></li>
              <li><a href='#'>Log Out</a></li>
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
