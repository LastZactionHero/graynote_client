var React = require('react');
var ShareActions = require('../actions/ShareActions');

var ShareListItem = React.createClass({
  handleDeleteShare(e){
    e.preventDefault();
    ShareActions.deleteShare(this.props.token, this.props.share);
  },
  render(){
    return(
      <li>
        {this.props.share.auth_key} |
        {this.props.share.permissions} |
        <a href="" onClick={this.handleDeleteShare}>X</a>
      </li>
    )
  }
});

module.exports = ShareListItem;
