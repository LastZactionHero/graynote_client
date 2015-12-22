var alt = require('../components/alt')
var UserSource = require('../sources/UserSource')

class UserActions {
  updateLoggedIn(token){
    this.dispatch(token.token);
  }
  updateRegistrationFailed(error){
    this.dispatch(error);
  }
  updateLoginFailed(error) {
    this.dispatch(error);
  }
  registerUser(email, password) {
    this.dispatch();
    UserSource.register(email, password).then(
      this.actions.updateLoggedIn,
      this.actions.updateRegistrationFailed
    )
  }
  loginUser(email, password) {
    this.dispatch();
    UserSource.login(email, password).then(
      this.actions.updateLoggedIn,
      this.actions.updateLoginFailed
    )
  }
  logOut() {
    this.dispatch();
  }
}

module.exports = alt.createActions(UserActions)
