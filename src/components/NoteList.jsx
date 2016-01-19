var React = require('react');
var NoteListStore = require('../stores/NoteListStore');
var SearchStore = require('../stores/SearchStore');
var NoteActions = require('../actions/NoteActions');
var NoteListItem = require('./NoteListItem');

var NoteList = React.createClass({
  getInitialState(){
    return NoteListStore.getState();
  },
  componentDidMount() {
    NoteListStore.listen(this.onChange);
    NoteActions.listNotes(this.props.token, SearchStore.getState().query);
  },
  componentWillUnmount() {
    NoteListStore.unlisten(this.onChange);
  },
  onChange(state) {
    this.setState(state);
  },
  render() {
    var token = this.props.token;
    var noteList = this.state.notes ?
      this.state.notes.map(function(i){return <NoteListItem note={i} token={token}></NoteListItem>;}) : '';
    return(
      <ul className='noteList'>
        {noteList}
      </ul>
    );
  }
});

module.exports = NoteList;
