/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import alt from 'components/alt';
import wrappedNoteStore, {NoteStore} from 'stores/NoteStore';
import noteActions from 'actions/NoteActions';
import userActions from 'actions/UserActions';

import AltTestingUtils from 'alt/utils/AltTestingUtils';

describe('NoteStore', function(){

  it('initializes with mode view', function(){
    expect(wrappedNoteStore.getState().mode).to.eql('view');
  });

  it('listens for newNote action', function(){
    var action = noteActions.NEW_NOTE;
    alt.dispatcher.dispatch({action});
    expect(wrappedNoteStore.getState().note).to.eql({});
  });

  it('sets mode to edit on new note', function(){
    var action = noteActions.NEW_NOTE;
    alt.dispatcher.dispatch({action});
    expect(wrappedNoteStore.getState().mode).to.eql('edit');
  });

  it('listens for noteSaved action', function(){
    var data = {id: 1, title: 'title', body: 'body'};
    var action = noteActions.NOTE_SAVED;

    alt.dispatcher.dispatch({action, data});
    expect(wrappedNoteStore.getState().note).to.eql({id: 1});
  });

  it('listens for noteFailed action', function(){
    var data = {errors: {title: ['is invalid']}};
    var action = noteActions.NOTE_FAILED;

    alt.dispatcher.dispatch({action, data});
    expect(wrappedNoteStore.getState().error).to.equal(data);
  });

  it('listens for noteFetched', function(){
    var data = {id: 1, title: 'title', body: 'body'};
    var action = noteActions.NOTE_FETCHED;

    alt.dispatcher.dispatch({action, data});
    expect(wrappedNoteStore.getState().note).to.equal(data);

  });

  it('listens for noteFetchFailed', function(){
    var data = {errors: {title: ['is invalid']}};
    var action = noteActions.NOTE_FETCH_FAILED;

    alt.dispatcher.dispatch({action, data});
    expect(wrappedNoteStore.getState().error).to.equal(data);

  });

  describe('clearNote', function(){

    beforeEach(function(){
      // Setup active note
      var data = {id: 99, title: 'latest note'};
      var action = noteActions.NOTE_FETCHED;
      alt.dispatcher.dispatch({action, data});
    });

    it('listens for clearNote', function(){
      // Clear the note
      var action = noteActions.CLEAR_NOTE;
      alt.dispatcher.dispatch({action});
      expect(wrappedNoteStore.getState().note).to.equal(null);
    });

    it('sets mode to view', function(){
      // Clear the note
      var action = noteActions.CLEAR_NOTE;
      alt.dispatcher.dispatch({action});
      expect(wrappedNoteStore.getState().mode).to.equal('view');
    });

  });

  it('response to switchModeView', function(){
    var action = noteActions.SWITCH_MODE_VIEW;
    alt.dispatcher.dispatch({action});
    expect(wrappedNoteStore.getState().mode).to.equal('view');
  });

  it('response to switchModeEdit', function(){
    var action = noteActions.SWITCH_MODE_EDIT;
    alt.dispatcher.dispatch({action});
    expect(wrappedNoteStore.getState().mode).to.equal('edit');
  });

  describe('listens for log out', function(){
    beforeEach(function(){
      // Setup active note
      var data = {id: 99, title: 'latest note'};
      var action = noteActions.NOTE_FETCHED;
      alt.dispatcher.dispatch({action, data});
    });

    it('clears the active note', function(){
      var action = userActions.LOG_OUT;
      alt.dispatcher.dispatch({action});
      expect(wrappedNoteStore.getState().note).to.equal(null);
    });
  });

});
