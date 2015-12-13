/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import NoteSource from 'sources/NoteSource';

describe('NoteSource', () => {
  var token = 'tokenabc123';

  describe("index", () => {
    var responseData;
    var server;

    beforeEach(function() { server = sinon.fakeServer.create(); })
    afterEach(function() { server.restore(); });

    describe("success", () => {
      var responseSuccess = [{id: 1, title: 'My Note', body: 'Note Body'}]

      beforeEach(function(done){
        NoteSource.index(token).then(
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
      var responseError = {errors: {}};

      beforeEach(function(done){
        NoteSource.index(token).then(
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

      it("should return success data", () => {
        expect(responseData).to.eql(responseError);
      });

    });

  });

  describe("show", () => {
    var responseData;
    var server;

    beforeEach(function() { server = sinon.fakeServer.create(); })
    afterEach(function() { server.restore(); });

    describe("success", () => {
      var responseSuccess = {id: 1, title: 'My Note', body: 'Note Body'}

      beforeEach(function(done){
        NoteSource.show(token, 1).then(
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
      var responseError = {errors: {}};

      beforeEach(function(done){
        NoteSource.show(token, 1).then(
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

      it("should return success data", () => {
        expect(responseData).to.eql(responseError);
      });

    });

  });

  describe("create", () => {
    var responseData;
    var server;

    beforeEach(function() { server = sinon.fakeServer.create(); })
    afterEach(function() { server.restore(); });

    describe("success", () => {
      var responseSuccess = {id: 1, title: 'My Note', body: 'Note Body'}

      beforeEach(function(done){
        NoteSource.create(token, 'title', 'body').then(
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
      var responseError = {errors: {title: ["is invalid"]}};

      beforeEach(function(done){
        NoteSource.create(token, 'title', 'body').then(
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

      it("should return success data", () => {
        expect(responseData).to.eql(responseError);
      });

    });

  });

  describe("update", () => {
    var responseData;
    var server;

    beforeEach(function() { server = sinon.fakeServer.create(); })
    afterEach(function() { server.restore(); });

    describe("success", () => {
      var responseSuccess = {id: 1, title: 'My Note', body: 'Note Body'}

      beforeEach(function(done){
        NoteSource.update(token, 1, 'title', 'body').then(
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
      var responseError = {errors: {title: ["is invalid"]}};

      beforeEach(function(done){
        NoteSource.create(token, 'title', 'body').then(
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

      it("should return success data", () => {
        expect(responseData).to.eql(responseError);
      });

    });

  });

  describe("delete", () => {
    var responseData;
    var server;

    beforeEach(function() { server = sinon.fakeServer.create(); })
    afterEach(function() { server.restore(); });

    describe("success", () => {
      var deletedNote = 99;

      beforeEach(function(done){
        NoteSource.delete(token, deletedNote).then(
          function(data){
            responseData = data;
            done();
          }, null);

        server.requests[0].respond(200, { "Content-Type": "application/json" }, '{}');
      });

      it("should return success", () => {
        expect(responseData).to.eql(deletedNote)
      });

    });

    describe("failure", () => {
      var responseError = {errors: {title: ["is invalid"]}};

      beforeEach(function(done){
        NoteSource.delete(token, 1).then(
          null,
          function(data){
            responseData = data;
            done();
          });

        server.requests[0].respond(
          400,
          { "Content-Type": "application/json" },
          JSON.stringify(responseError));
      });

      it("should return success data", () => {
        expect(responseData).to.eql(responseError);
      });

    });

  });

});
