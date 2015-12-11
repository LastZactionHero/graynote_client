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
      function(error){
        this.actions.updateRegistrationFailed(error)
      }
    )
  }
}

module.exports = alt.createActions(UserActions)
