import React from 'react';
import NoteActions from '../actions/NoteActions';
import Note from './Note';
import NoteStore from '../stores/NoteStore';

var Share = React.createClass({
  componentDidMount() {
    NoteStore.listen(this.onChange);
    this.setState({
      shareAuthKey: this.props.params.shareAuthKey
    });
    this.loadNote(this.props.params.shareAuthKey);
  },
  componentWillUnmount() {
    NoteStore.listen(this.onChange);
  },
  onChange(state) {
    this.setState(state)
  },
  loadNote(authKey){
    NoteActions.showNote(null, authKey);
  },
  render() {
    return(
      <div className='container-fluid'>
        {this.state ? this.state.note ? <Note token={this.state.token}></Note> : '' : ''}
      </div>
    )
  }
});

module.exports = Share;
