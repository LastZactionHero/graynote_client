/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import alt from 'components/alt';
import wrappedNoteStore, {NoteStore} from 'stores/NoteStore';
import noteActions from 'actions/NoteActions';

import AltTestingUtils from 'alt/utils/AltTestingUtils';

describe('NoteStore', function(){

  it('listens for newNote action', function(){
    var action = noteActions.NEW_NOTE;
    alt.dispatcher.dispatch({action});
    expect(wrappedNoteStore.getState().note).to.eql({});
  });

  it('listens for noteSaved action', function(){
    var data = {id: 1, title: 'title', body: 'body'};
    var action = noteActions.NOTE_SAVED;

    alt.dispatcher.dispatch({action, data});
    expect(wrappedNoteStore.getState().note).to.equal(data);
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

  it('listens for clearNote', function(){
    // Setup active note
    var data = {id: 99, title: 'latest note'};
    var action = noteActions.NOTE_FETCHED;
    alt.dispatcher.dispatch({action, data});

    // Clear the note
    var action = noteActions.CLEAR_NOTE;
    alt.dispatcher.dispatch({action});
    expect(wrappedNoteStore.getState().note).to.equal(null);
  });

});
