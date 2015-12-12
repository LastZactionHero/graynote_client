/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import UserSource from 'sources/UserSource';

describe('UserSource', () => {

  describe("register", () => {
    var responseData;
    var server;

    beforeEach(function() { server = sinon.fakeServer.create(); })
    after(function () { server.restore(); });

    describe("success", () => {
      var responseSuccess = {token: "mytoken123"}

      beforeEach(function(done){
        UserSource.register("email", "password").then(
          function(data){
            responseData = data;
            done();
          }, null);

        server.requests[0].respond(
          200,
          { "Content-Type": "application/json" },
          JSON.stringify(responseSuccess)
        );
      });

      it("should return success data", () => {
        expect(responseData).to.eql(responseSuccess);
      });

    });

    describe("failure", () => {
      var responseError = {errors: {email: ["is bad"]}}

      beforeEach(function(done){
        UserSource.register("email", "password").then(
          null,
          function(data){
            responseData = data;
            done();
          });

        server.requests[0].respond(
          400,
          { "Content-Type": "application/json" },
          JSON.stringify(responseError)
        );
      });

      it("should return a promise", () => {
        expect(responseData).to.eql(responseError);
      });

    });

  });

  describe("login", () => {
    var responseData;
    var server;

    beforeEach(function() { server = sinon.fakeServer.create(); })
    after(function () { server.restore(); });

    describe("success", () => {
      var responseSuccess = {token: "mytoken123"}

      beforeEach(function(done){
        UserSource.login("email", "password").then(
          function(data){
            responseData = data;
            done();
          }, null);

        server.requests[0].respond(
          200,
          { "Content-Type": "application/json" },
          JSON.stringify(responseSuccess)
        );
      });

      it("should return success data", () => {
        expect(responseData).to.eql(responseSuccess);
      });

    });

    describe("failure", () => {
      var responseError = {errors: {email: ["not found"]}}

      beforeEach(function(done){
        UserSource.login("email", "password").then(
          null,
          function(data){
            responseData = data;
            done();
          });

        server.requests[0].respond(
          400,
          { "Content-Type": "application/json" },
          JSON.stringify(responseError)
        );
      });

      it("should return a promise", () => {
        expect(responseData).to.eql(responseError);
      });

    });

  });

});
