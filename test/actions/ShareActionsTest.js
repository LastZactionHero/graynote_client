/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import alt from 'components/alt'
import ShareActions from 'actions/ShareActions'

describe('ShareActions', function(){
  var dispatcherSpy;

  beforeEach(function(){
    dispatcherSpy = sinon.spy(alt.dispatcher, 'dispatch');
  });
  afterEach(function(){
    alt.dispatcher.dispatch.restore();
  });

  describe('createShare', function(){
    var server;
    beforeEach(function(){server = sinon.fakeServer.create();});
    afterEach(function(){server.restore();});

    it('dispatches the new share after successful create', function(done){
      var token = 'abc123';
      var permissions = 'readwrite';
      var note = {id: 1};
      var shareSuccessResponse = {auth_key:"sharecode123", note_id:1,permissions:"readwrite"};

      ShareActions.createShare(token, note, permissions);

      server.requests[0].respond(
        200,
        {'Content-Type': 'application/json'},
        JSON.stringify(shareSuccessResponse)
      );

      setTimeout(function(){
        expect(dispatcherSpy.args[0][0].type).to.equal("ShareActions.createShare");
        expect(dispatcherSpy.args[1][0].type).to.equal("ShareActions.createShareSuccess");
        expect(dispatcherSpy.args[1][0].payload).to.eql(shareSuccessResponse);
        done();
      });
    });

    it('dispatches the error after failed create', function(done){
      var token = 'abc123';
      var permissions = 'readwrite';
      var note = {id: 1};
      var shareErrorResponse = {error: {permissions:["is required"]}};

      ShareActions.createShare(token, note, permissions);

      server.requests[0].respond(
        400,
        {'Content-Type': 'application/json'},
        JSON.stringify(shareErrorResponse)
      );

      setTimeout(function(){
        expect(dispatcherSpy.args[0][0].type).to.equal("ShareActions.createShare");
        expect(dispatcherSpy.args[1][0].type).to.equal("ShareActions.createShareFail");
        expect(dispatcherSpy.args[1][0].payload).to.eql(shareErrorResponse);
        done();
      });
    });

  });

  describe('deleteShare', function(){
    var server;
    beforeEach(function(){server = sinon.fakeServer.create();});
    afterEach(function(){server.restore();});

    it('dispatches the share deleted success after successful delete', function(done){
      var token = 'abc123';
      var share = {auth_key: "sharekey123"};

      ShareActions.deleteShare(token, share);

      server.requests[0].respond(200, {'Content-Type': 'application/json'}, '{}');
      setTimeout(function(){
        expect(dispatcherSpy.args[0][0].type).to.equal("ShareActions.deleteShare");
        expect(dispatcherSpy.args[1][0].type).to.equal("ShareActions.deleteShareSuccess");
        done();
      });
    });

    it('dispatches the error after failed delete', function(done){
      var token = 'abc123';
      var share = {auth_key: "sharekey123"};

      ShareActions.deleteShare(token, share);

      server.requests[0].respond(400, {'Content-Type': 'application/json'}, '{}');

      setTimeout(function(){
        expect(dispatcherSpy.args[0][0].type).to.equal("ShareActions.deleteShare");
        expect(dispatcherSpy.args[1][0].type).to.equal("ShareActions.deleteShareFail");
        done();
      });
    });

  });

});
