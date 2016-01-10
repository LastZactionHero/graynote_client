var React = require('react');
var ShareListItem = require('./ShareListItem');
var ShareActions = require('../actions/ShareActions');

var NoteShare = React.createClass({
  handleAddReadOnlyShare(e){
    e.preventDefault();
    this.createShare("read");
  },
  handleAddReadWriteShare(e){
    e.preventDefault();
    this.createShare("readwrite");
  },
  createShare(permissions){
    ShareActions.createShare(this.props.token, this.props.note, permissions);
  },
  render() {
    var token = this.props.token;
    var shareList = this.props.shares ?
      this.props.shares.map(function(s){return <ShareListItem token={token} share={s}></ShareListItem>}) : '';

    return(
      <div>
        <h3>Share Note</h3>
        <a href="" onClick={this.handleAddReadOnlyShare}>Add Read-Only Share</a>
        <br/>
        <a href="" onClick={this.handleAddReadWriteShare}>Add Read-Write Share</a>
        <ul>
          {shareList}
        </ul>
      </div>
    )
  }
});

module.exports = NoteShare;
