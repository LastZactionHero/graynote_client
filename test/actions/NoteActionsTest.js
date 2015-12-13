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

  describe("createNote", function(){

    it("dispatches noteSaved after note is created", function(){
      var note = {id: 1, title: 'title', body: 'body'};
      noteActions.createNote(token, 'title', 'body');

      server.requests[0].respond(
        200,
        {'Content-Type': 'application/json'},
        JSON.stringify(note)
      );

      setTimeout(function(){
        expect(dispatcherSpy.args[0][0].type).to.equal("UserActions.createNote");
        expect(dispatcherSpy.args[1][0].type).to.equal("UserActions.noteSaved");
        expect(dispatcherSpy.args[1][1].payload).to.equal(note);
      });
    });

    it("dispatches noteFailed on failed create", function(){
      var error = {errors: {title: ['is invalid']}};
      noteActions.createNote(token, 'title', 'body');

      server.requests[0].respond(
        400,
        {'Content-Type': 'application/json'},
        JSON.stringify(error)
      );

      setTimeout(function(){
        expect(dispatcherSpy.args[0][0].type).to.equal('UserActions.createNote');
        expect(dispatcherSpy.args[1][0].type).to.equal('UserActions.noteFailed');
        expect(dispatcherSpy.args[1][1].payload).to.equal(error);
      });
    });

  });

  describe("updateNote", function(){

    it("dispatches noteSaved after note is updated", function(){
      var note = {id: 1, title: 'title', body: 'body'};
      noteActions.updateNote(token, 1, 'title', 'body');

      server.requests[0].respond(
        200,
        {'Content-Type': 'application/json'},
        JSON.stringify(note)
      );

      setTimeout(function(){
        expect(dispatcherSpy.args[0][0].type).to.equal("UserActions.updateNote");
        expect(dispatcherSpy.args[1][0].type).to.equal("UserActions.noteSaved");
        expect(dispatcherSpy.args[1][1].payload).to.equal(note);
      });
    });

    it("dispatches noteFailed on failed update", function(){
      var error = {errors: {title: ['is invalid']}};
      noteActions.updateNote(token, 1, 'title', 'body');

      server.requests[0].respond(
        400,
        {'Content-Type': 'application/json'},
        JSON.stringify(error)
      );

      setTimeout(function(){
        expect(dispatcherSpy.args[0][0].type).to.equal('UserActions.updateNote');
        expect(dispatcherSpy.args[1][0].type).to.equal('UserActions.noteFailed');
        expect(dispatcherSpy.args[1][1].payload).to.equal(error);
      });
    });

  });

  describe("showNote", function(){

    it("dispatches noteFetched after note is fetched", function(){
      var note = {id: 1, title: 'title', body: 'body'};
      noteActions.showNote(1);

      server.requests[0].respond(
        200,
        {'Content-Type': 'application/json'},
        JSON.stringify(note)
      );

      setTimeout(function(){
        expect(dispatcherSpy.args[0][0].type).to.equal("UserActions.showNote");
        expect(dispatcherSpy.args[1][0].type).to.equal("UserActions.noteFetched");
        expect(dispatcherSpy.args[1][1].payload).to.equal(note);
      });
    });

    it("dispatches noteFailed on failed update", function(){
      var error = {errors: {title: ['is invalid']}};
      noteActions.showNote(token, 1);

      server.requests[0].respond(
        400,
        {'Content-Type': 'application/json'},
        JSON.stringify(error)
      );

      setTimeout(function(){
        expect(dispatcherSpy.args[0][0].type).to.equal('UserActions.showNote');
        expect(dispatcherSpy.args[1][0].type).to.equal('UserActions.noteFetchFailed');
        expect(dispatcherSpy.args[1][1].payload).to.equal(error);
      });
    });

  });

  describe("listNotes", function(){

    it("dispatches notesFetched after notes are received", function(){
      var notes = [{id: 1, title: 'title', body: 'body'}];
      noteActions.listNotes(token)

      server.requests[0].respond(
        200,
        {'Content-Type': 'application/json'},
        JSON.stringify(notes)
      );

      setTimeout(function(){
        expect(dispatcherSpy.args[0][0].type).to.equal("UserActions.listeNotes");
        expect(dispatcherSpy.args[1][0].type).to.equal("UserActions.notesFetched");
        expect(dispatcherSpy.args[1][1].payload).to.equal(notes);
      });
    });

    it("dispatches noteFailed on failed update", function(){
      var error = {errors: {}};
      noteActions.listNotes(token);

      server.requests[0].respond(
        400,
        {'Content-Type': 'application/json'},
        JSON.stringify(error)
      );

      setTimeout(function(){
        expect(dispatcherSpy.args[0][0].type).to.equal('UserActions.listNotes');
        expect(dispatcherSpy.args[1][0].type).to.equal('UserActions.notesFetchedFailed');
        expect(dispatcherSpy.args[1][1].payload).to.equal(error);
      });
    });

  });

});
