var React = require('react');
var SearchStore = require('../stores/SearchStore');
var UserStore = require('../stores/UserStore');
var SearchActions = require('../actions/SearchActions');
var NoteActions = require('../actions/NoteActions');

var Search = React.createClass({
  getInitialState() {
    return SearchStore.getState();
  },
  componentDidMount() {
    SearchStore.listen(this.onChange);
  },
  componentWillUnmount() {
    SearchStore.unlisten(this.onChange);
  },
  onChange(state) {
    this.setState(state);
  },
  handleQueryChange(e) {
    SearchActions.updateQuery(e.target.value);
    NoteActions.listNotes(UserStore.getState().token, e.target.value);
  },
  render(){
    return(
      <form className="navbar-form navbar-left" role="search">
        <div className="form-group">
          <input type="text"
            className="form-control"
            placeholder="Search"
            onChange={this.handleQueryChange}
            value={this.state.query} />
        </div>
      </form>
    );
  }
});

module.exports = Search;
