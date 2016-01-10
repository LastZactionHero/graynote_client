/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import ShareSource from 'sources/ShareSource';

describe("ShareSource", function(){

  describe("create", function(){
    var responseData;
    var server;

    beforeEach(function(){server = sinon.fakeServer.create()});
    afterEach(function() { server.restore(); });

    describe("success", function(){
      var responseSuccess = {
        "auth_key": "4ee4f5b47e0ae8c5240ebfcf5f41beaf",
        "note_id": 21,
        "permissions": "readwrite"
      };

      beforeEach(function(done){
        var note = {id: 123};
        ShareSource.create("abc123", note).then(function(data){
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
      var responseError = {errors: {note_id: ["is bad"]}}

      beforeEach(function(done){
        var note = {id: 123};
        ShareSource.create("abc123", note).then(
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

  describe("delete", function(){

  });
});
