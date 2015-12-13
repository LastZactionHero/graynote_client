/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import alt from 'components/alt';
import noteActions from 'actions/NoteActions';

describe("NoteActions", function(){
  var token = 'tokenabc123';
  var server;
  var dispatcherSpy;

  beforeEach(function(){
    server = sinon.fakeServer.create();
    dispatcherSpy = sinon.spy(alt.dispatcher, 'dispatch');
  });

  afterEach(function(){
    server.restore();
    alt.dispatcher.dispatch.restore();
  });

  describe('clearNote', function(){
    it('dispatches clearNote', function(){
      noteActions.clearNote();
      expect(dispatcherSpy.args[0][0].type).to.equal("NoteActions.clearNote")
    });
  });

  describe('newNote', function(){

    it('dispatches newNote', function(){
      noteActions.newNote();
      expect(dispatcherSpy.args[0][0].type).to.equal("NoteActions.newNote")
    });

  });

  describe("createNote", function(){

    it("dispatches noteSaved after note is created", function(done){
      var note = {id: 1, title: 'title', body: 'body'};
      noteActions.createNote(token, 'title', 'body');

      server.requests[0].respond(
        200,
        {'Content-Type': 'application/json'},
        JSON.stringify(note)
      );

      setTimeout(function(){
        expect(dispatcherSpy.args[0][0].type).to.equal("NoteActions.createNote");
        expect(dispatcherSpy.args[1][0].type).to.equal("NoteActions.noteSaved");
        expect(dispatcherSpy.args[1][0].payload).to.eql(note);
        done();
      });
    });

    it("dispatches noteFailed on failed create", function(done){
      var error = {errors: {title: ['is invalid']}};
      noteActions.createNote(token, 'title', 'body');

      server.requests[0].respond(
        400,
        {'Content-Type': 'application/json'},
        JSON.stringify(error)
      );

      setTimeout(function(){
        expect(dispatcherSpy.args[0][0].type).to.equal('NoteActions.createNote');
        expect(dispatcherSpy.args[1][0].type).to.equal('NoteActions.noteFailed');
        expect(dispatcherSpy.args[1][0].payload).to.eql(error);
        done();
      });
    });

  });

  describe("updateNote", function(){

    it("dispatches noteSaved after note is updated", function(done){
      var note = {id: 1, title: 'title', body: 'body'};
      noteActions.updateNote(token, 1, 'title', 'body');

      server.requests[0].respond(
        200,
        {'Content-Type': 'application/json'},
        JSON.stringify(note)
      );

      setTimeout(function(){
        expect(dispatcherSpy.args[0][0].type).to.equal("NoteActions.updateNote");
        expect(dispatcherSpy.args[1][0].type).to.equal("NoteActions.noteSaved");
        expect(dispatcherSpy.args[1][0].payload).to.eql(note);
        done();
      });
    });

    it("dispatches noteFailed on failed update", function(done){
      var error = {errors: {title: ['is invalid']}};
      noteActions.updateNote(token, 1, 'title', 'body');

      server.requests[0].respond(
        400,
        {'Content-Type': 'application/json'},
        JSON.stringify(error)
      );

      setTimeout(function(){
        expect(dispatcherSpy.args[0][0].type).to.equal('NoteActions.updateNote');
        expect(dispatcherSpy.args[1][0].type).to.equal('NoteActions.noteFailed');
        expect(dispatcherSpy.args[1][0].payload).to.eql(error);
        done();
      });
    });

  });

  describe("showNote", function(){

    it("dispatches noteFetched after note is fetched", function(done){
      var note = {id: 1, title: 'title', body: 'body'};
      noteActions.showNote(1);

      server.requests[0].respond(
        200,
        {'Content-Type': 'application/json'},
        JSON.stringify(note)
      );

      setTimeout(function(){
        expect(dispatcherSpy.args[0][0].type).to.equal("NoteActions.showNote");
        expect(dispatcherSpy.args[1][0].type).to.equal("NoteActions.noteFetched");
        expect(dispatcherSpy.args[1][0].payload).to.eql(note);
        done();
      });
    });

    it("dispatches noteFailed on failed update", function(done){
      var error = {errors: {title: ['is invalid']}};
      noteActions.showNote(token, 1);

      server.requests[0].respond(
        400,
        {'Content-Type': 'application/json'},
        JSON.stringify(error)
      );

      setTimeout(function(){
        expect(dispatcherSpy.args[0][0].type).to.equal('NoteActions.showNote');
        expect(dispatcherSpy.args[1][0].type).to.equal('NoteActions.noteFetchFailed');
        expect(dispatcherSpy.args[1][0].payload).to.eql(error);
        done();
      });
    });

  });

  describe("listNotes", function(){

    it("dispatches notesFetched after notes are received", function(done){
      var notes = [{id: 1, title: 'title', body: 'body'}];
      noteActions.listNotes(token)

      server.requests[0].respond(
        200,
        {'Content-Type': 'application/json'},
        JSON.stringify(notes)
      );

      setTimeout(function(){
        expect(dispatcherSpy.args[0][0].type).to.equal("NoteActions.listNotes");
        expect(dispatcherSpy.args[1][0].type).to.equal("NoteActions.notesFetched");
        expect(dispatcherSpy.args[1][0].payload).to.eql(notes);
        done();
      });
    });

    it("dispatches noteFailed on failed update", function(done){
      var error = {errors: {}};
      noteActions.listNotes(token);

      server.requests[0].respond(
        400,
        {'Content-Type': 'application/json'},
        JSON.stringify(error)
      );

      setTimeout(function(){
        expect(dispatcherSpy.args[0][0].type).to.equal('NoteActions.listNotes');
        expect(dispatcherSpy.args[1][0].type).to.equal('NoteActions.notesFetchedFailed');
        expect(dispatcherSpy.args[1][0].payload).to.eql(error);
        done();
      });
    });

  });

  describe('deleteNote', function(){

    it('dispatches noteDeleted on success', function(done){
      noteActions.deleteNote(token, 1);
      server.requests[0].respond(200, {'Content-Type': 'application/json'}, '{}');

      setTimeout(function(){
        expect(dispatcherSpy.args[0][0].type).to.equal('NoteActions.deleteNote');
        expect(dispatcherSpy.args[1][0].type).to.equal('NoteActions.noteDeleted');
        expect(dispatcherSpy.args[1][0].payload).to.equal(1);
        done();
      });
    });

    it('dispatches noteDeleteFailed on failure', function(done){
      var error = {errors: {}};
      noteActions.deleteNote(token, 1);
      server.requests[0].respond(400, {'Content-Type': 'application/json'}, JSON.stringify(error));

      setTimeout(function(){
        expect(dispatcherSpy.args[0][0].type).to.equal('NoteActions.deleteNote');
        expect(dispatcherSpy.args[1][0].type).to.equal('NoteActions.noteDeleteFailed');
        expect(dispatcherSpy.args[1][0].payload).to.eql(error);
        done();
      });
    });

  });
});
