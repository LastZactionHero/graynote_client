import React from 'react';
import Registration from './Registration';
import Note from './Note';
import NoteList from './NoteList';
import UserStore from '../stores/UserStore';
import NoteStore from '../stores/NoteStore';

var Dashboard = React.createClass({
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
      <div className='container-fluid'>
        <Registration></Registration>
        {this.state.note ? <Note token={this.state.token}></Note> : <NoteList token={this.state.token}></NoteList>}
      </div>
    );
  }
});

module.exports = Dashboard;
