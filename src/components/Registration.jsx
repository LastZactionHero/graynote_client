var React = require("react");
var UserStore = require('../stores/UserStore')
var UserActions = require("../actions/UserActions")

var Registration = React.createClass({
  getInitialState() {
    return UserStore.getState();
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
    UserActions.registerUser(email, password)
  },
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Sign Up for GrayNote</h2>

        {this.state.error ? <div className='alert alert-danger'>{JSON.stringify(this.state.error)}</div> : ''}
        {this.state.token ? <div className='alert alert-success'>{this.state.token}</div> : ''}

        <div className='form-group'>
          <label>Email</label>
          <input
            value={this.state.email}
            onChange={this.handleEmailChange}
            type='text'
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
        <button type="submit" className="btn btn-default">Sign Up</button>
      </form>
    );
  }
});

module.exports = Registration;
