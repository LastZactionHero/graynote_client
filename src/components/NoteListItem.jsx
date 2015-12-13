var React = require('react');
var NoteActions = require('../actions/NoteActions');

var NoteListItem = React.createClass({
  handleViewNote(e) {
    e.preventDefault();
    NoteActions.showNote(this.props.token, this.props.note.id);
  },
  handleDeleteNote(e) {
    e.preventDefault();
    alert("Deleting")
  },
  render() {
    return(
      <li>
        {this.props.note.title} | <a href='' onClick={this.handleViewNote}>View</a> | <a href='' onClick={this.handleDeleteNote}>Delete</a>
      </li>
    );
  }
});

module.exports = NoteListItem;
