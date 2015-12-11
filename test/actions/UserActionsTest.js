/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import alt from 'components/alt'
import userActions from 'actions/UserActions'

describe('UserActions', () => {

  describe("registerUser", () => {
    var server;
    var dispatcherSpy;

    beforeEach(function() {
      server = sinon.fakeServer.create();
      dispatcherSpy = sinon.spy(alt.dispatcher, 'dispatch');
    });

    afterEach(function(){
      server.restore();
      alt.dispatcher.dispatch.restore();
    });

    it("dispatches updateLoggedIn after successful registration", () => {
      var token = "abc123"
      userActions.registerUser("email", "password");

      server.requests[0].respond(
        200,
        { "Content-Type": "application/json" },
        JSON.stringify({token: token})
      );

      setTimeout(function(){
        expect(dispatcherSpy.args[0][0].type).to.equal("UserActions.registerUser")
        expect(dispatcherSpy.args[1][0].type).to.equal("UserActions.updateLoggedIn")
        expect(dispatcherSpy.args[1][0].payload).to.equal(token)
      });
    });


    it("dispatches updateRegistrationFailed after failed registration", () => {
      var expectedError = {error: {email: ["invalid"]}};
      userActions.registerUser("email", "password");

      server.requests[0].respond(
        400,
        { "Content-Type": "application/json" },
        JSON.stringify(expectedError)
      );

      setTimeout(function(){
        expect(dispatcherSpy.args[0][0].type).to.equal("UserActions.registerUser")
        expect(dispatcherSpy.args[1][0].type).to.equal("UserActions.updateRegistrationFailed")
        expect(dispatcherSpy.args[1][0].payload).to.equal(expectedError)
      });
    });

  });

})
