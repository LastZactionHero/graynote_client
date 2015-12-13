var alt = require('../components/alt')
var UserActions = require('../actions/UserActions')

class UserStore {
  constructor() {
    this.token = this.restoreSavedToken();
    this.error = null;
    this.bindListeners({
      handleUpdateLoggedIn: UserActions.UPDATE_LOGGED_IN,
      handleUpdateRegistrationFailed: UserActions.UPDATE_REGISTRATION_FAILED,
      handleUpdateLoginFailed: UserActions.UPDATE_LOGIN_FAILED
    })
  }
  handleUpdateLoggedIn(token) {
    this.error = null;
    this.token = token;
    this.saveTokenLocally(token)
  }
  handleUpdateLoginFailed(error) {
    this.token = null;
    this.error = error;
  }
  handleUpdateRegistrationFailed(error) {
    this.token = null;
    this.error = error;
  }
  saveTokenLocally(token) {
    localStorage.setItem('token', token)
  }
  restoreSavedToken() {
    return localStorage.getItem('token')
  }
}

module.exports = alt.createStore(UserStore, 'UserStore')
