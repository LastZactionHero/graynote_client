/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import alt from 'components/alt'
import userActions from 'actions/UserActions'

describe('UserActions', () => {
  var dispatcherSpy;

  beforeEach(function() {
    dispatcherSpy = sinon.spy(alt.dispatcher, 'dispatch');
  });

  afterEach(function(){
    alt.dispatcher.dispatch.restore();
  });


  describe("registerUser", () => {
    var server;

    beforeEach(function() {
      server = sinon.fakeServer.create();
    });

    afterEach(function(){
      server.restore();
    });

    it("dispatches updateLoggedIn after successful registration", (done) => {
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
        done();
      });
    });


    it("dispatches updateRegistrationFailed after failed registration", (done) => {
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
        expect(dispatcherSpy.args[1][0].payload).to.eql(expectedError)
        done();
      });
    });

  });

  describe("loginUser", () => {
    var server;

    beforeEach(function() {
      server = sinon.fakeServer.create();
    });

    afterEach(function(){
      server.restore();
    });

    it("dispatches updateLoggedIn after successful login", (done) => {
      var token = "abc123"
      userActions.loginUser("email", "password");

      server.requests[0].respond(
        200,
        { "Content-Type": "application/json" },
        JSON.stringify({token: token})
      );

      setTimeout(function(){
        expect(dispatcherSpy.args[0][0].type).to.equal("UserActions.loginUser")
        expect(dispatcherSpy.args[1][0].type).to.equal("UserActions.updateLoggedIn")
        expect(dispatcherSpy.args[1][0].payload).to.equal(token)
        done();
      });
    });


    it("dispatches updateRegistrationFailed after failed login", (done) => {
      var expectedError = {error: {email: ["invalid"]}};
      userActions.loginUser("email", "password");

      server.requests[0].respond(
        400,
        { "Content-Type": "application/json" },
        JSON.stringify(expectedError)
      );

      setTimeout(function(){
        expect(dispatcherSpy.args[0][0].type).to.equal("UserActions.loginUser")
        expect(dispatcherSpy.args[1][0].type).to.equal("UserActions.updateLoginFailed")
        expect(dispatcherSpy.args[1][0].payload).to.eql(expectedError)
        done();
      });
    });

  });

  describe('logOut', function(){
    describe('logOut', function(){
      it('dispatches logOut', function(){
        userActions.logOut();
        expect(dispatcherSpy.args[0][0].type).to.equal('UserActions.logOut');
      });
    });
  });
})
