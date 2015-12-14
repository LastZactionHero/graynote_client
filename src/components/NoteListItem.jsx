var React = require('react');
var NoteActions = require('../actions/NoteActions');

var NoteListItem = React.createClass({
  handleViewNote(e) {
    e.preventDefault();
    NoteActions.showNote(this.props.token, this.props.note.id);
  },
  handleDeleteNote(e) {
    e.preventDefault();
    NoteActions.deleteNote(this.props.token, this.props.note.id);
  },
  render() {
    return(
      <li className='row' onClick={this.handleViewNote}>
        <div className='col-md-11'>
          <h3>{this.props.note.title}</h3>
          <p>{this.props.note.body}</p>
        </div>
        <div className='col-md-1 trash' onClick={this.handleDeleteNote}>
          <span><i className="fa fa-trash"></i></span>
        </div>
      </li>
    );
  }
});

module.exports = NoteListItem;
