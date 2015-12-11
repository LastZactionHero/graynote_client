var alt = require("../components/alt")
var UserActions = require("../actions/UserActions")

class UserStore {
  constructor() {
    this.token = null;
    this.error = null;
    this.bindListeners({
      handleUpdateLoggedIn: UserActions.UPDATE_LOGGED_IN,
      handleUpdateRegistrationFailed: UserActions.UPDATE_REGISTRATION_FAILED
    })
  }
  handleUpdateLoggedIn(token) {
    this.error = null;
    this.token = token;
  }
  handleUpdateRegistrationFailed(error) {
    this.token = null;
    this.error = error
  }
}

module.exports = alt.createStore(UserStore, 'UserStore')
