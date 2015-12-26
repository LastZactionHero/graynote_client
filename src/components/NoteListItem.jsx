var React = require('react');
var NoteActions = require('../actions/NoteActions');

var NoteListItem = React.createClass({
  handleViewNote(e) {
    e.preventDefault();
    NoteActions.showNote(this.props.token, this.props.note.id);
  },
  handleDeleteNote(e) {
    e.preventDefault();
    var confirmDelete = confirm("Are you sure you would like to delete this note?");
    if(confirmDelete){
      NoteActions.deleteNote(this.props.token, this.props.note.id);
    }
  },
  truncateSummaryText(text) {
    var max_summary_len = 256;
    var summary = text.replace(/(<([^>]+)>)/ig," ");
    if(text.length > max_summary_len) {
      summary = summary.slice(0, max_summary_len) + "...";
    }
    return summary;
  },
  render() {
    return(
      <li className='row'>
        <div className='col-md-11' onClick={this.handleViewNote}>
          <h3>{this.props.note.title}</h3>
          <p>
            {this.truncateSummaryText(this.props.note.body)}
          </p>
        </div>
        <div className='col-md-1 trash' onClick={this.handleDeleteNote}>
          <span><i className="fa fa-trash"></i></span>
        </div>
      </li>
    );
  }
});

module.exports = NoteListItem;
