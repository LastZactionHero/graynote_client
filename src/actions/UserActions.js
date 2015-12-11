var alt = require("../components/alt")
var UserSource = require("../sources/UserSource")

class UserActions {
  updateLoggedIn(token){
    this.dispatch(token.token)
  }
  updateRegistrationFailed(error){
    this.dispatch(error)
  }
  registerUser(email, password) {
    this.dispatch();
    UserSource.register(email, password).then(
      this.actions.updateLoggedIn,
      this.actions.updateRegistrationFailed
    )
  }
}

module.exports = alt.createActions(UserActions)
