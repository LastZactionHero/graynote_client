var React = require('react');
var UserStore = require('../stores/UserStore')
var UserActions = require('../actions/UserActions')

var Registration = React.createClass({
  getInitialState() {
    var data = UserStore.getState();
    data.usage = 'register'
    return data;
  },
  componentDidMount() {
    UserStore.listen(this.onChange);
  },
  componentWillUnmount() {
    UserStore.unlisten(this.onChange);
  },
  onChange(state) {
    this.setState(state);
  },
  handleEmailChange(e) {
    this.setState({email: e.target.value});
  },
  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  },
  handleSubmit(e) {
    e.preventDefault();

    if(!this.state.email || !this.state.password){ return; }

    var email = this.state.email.trim();
    var password = this.state.password.trim();
    if(this.state.usage == 'register'){
      UserActions.registerUser(email, password);
    } else {
      UserActions.loginUser(email, password);
    }
  },
  toggleUsage(e) {
    e.preventDefault();

    var newUsage;
    var usage = this.state.usage;

    if(usage == 'register'){
      newUsage = 'login'
    } else {
      newUsage = 'register'
    }
    this.setState({usage: newUsage})
  },
  render() {
    if(this.state.token){
      return(
        <div></div>
      )
    } else {
      return (
        <form onSubmit={this.handleSubmit}>
          <h2>{this.state.usage == 'register' ? 'Sign Up for GrayNote' : 'Login to GrayNote'}</h2>

          {this.state.error ? <div className='alert alert-danger'>{JSON.stringify(this.state.error)}</div> : ''}

          <div className='form-group'>
            <label>Email</label>
            <input
              value={this.state.email}
              onChange={this.handleEmailChange}
              type='email'
              className='form-control'></input>
          </div>
          <div className='form-group'>
            <label>Password</label>
            <input
              value={this.state.password}
              onChange={this.handlePasswordChange}
              type='password'
              className='form-control'></input>
          </div>

          <button type='submit' className='btn btn-default'>
            {this.state.usage == 'register' ? 'Sign Up' : 'Log In'}
          </button>
          <a href='#' onClick={this.toggleUsage}>{this.state.usage == 'register' ? 'I already have an account.' : 'Create an account.'}</a>
        </form>

      );
    }
  }
});

module.exports = Registration;
