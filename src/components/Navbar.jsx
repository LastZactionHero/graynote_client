var React = require('react');
import NoteActions from '../actions/NoteActions';
import UserActions from '../actions/UserActions';
import Search from './Search';
import UserStore from '../stores/UserStore';

var Navbar = React.createClass({
  getInitialState(){
    return UserStore.getState();
  },
  componentDidMount(){
    UserStore.listen(this.onChange);
  },
  componentWillUnmount(){
    UserStore.unlisten(this.onChange);
  },
  onChange(state) {
    this.setState(state);
  },
  handleNewNote(e) {
    e.preventDefault();
    NoteActions.newNote();
  },
  handleListNotes(e) {
    e.preventDefault();
    NoteActions.clearNote();
  },
  handleLogOut(e) {
    e.preventDefault();
    UserActions.logOut();
  },
  render(){
    return(
      <nav className='navbar navbar-inverse navbar-fixed-top'>
        <div className='container-fluid'>
          <div className="navbar-header">
            <a className="navbar-brand" href="">graynote</a>
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>
          {this.state.token ?
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className='nav navbar-nav'>
                <li><a href='#' onClick={this.handleListNotes}><i className='fa fa-list'></i>&nbsp;&nbsp;List All</a></li>
                <li><a href='#' onClick={this.handleNewNote}><i className='fa fa-plus'></i>&nbsp;&nbsp;New Note</a></li>
                <Search></Search>
              </ul>
              <ul className='nav navbar-nav navbar-right'>
                <li><a href='#' onClick={this.handleLogOut}>Log Out</a></li>
              </ul>
            </div>
            : ''
          }
        </div>
      </nav>
    )
  }
});

module.exports = Navbar;
