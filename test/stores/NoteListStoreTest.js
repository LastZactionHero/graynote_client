/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import alt from 'components/alt';
import wrappedNoteListStore, {NoteListStore} from 'stores/NoteListStore';
import noteActions from 'actions/NoteActions';
import userActions from 'actions/UserActions';

import AltTestingUtils from 'alt/utils/AltTestingUtils';

describe('NoteListStore', function(){

  it('listens for note list fetched', function(){
    var data = [{id: 1, title: 'my note', body: 'body'}];
    var action = noteActions.NOTES_FETCHED;

    alt.dispatcher.dispatch({action, data});
    expect(wrappedNoteListStore.getState().notes).to.equal(data);
  });

  it('listens for note list fetch failure', function(){
    var data = {errors: {}};
    var action = noteActions.NOTES_FETCHED_FAILED;

    alt.dispatcher.dispatch({action, data});
    expect(wrappedNoteListStore.getState().error).to.equal(data);
  });

  describe('delete', function(){
    var notes = [{id: 1, title: 'my note', body: 'hello world'}];

    beforeEach(function(){
      var action = noteActions.NOTES_FETCHED;
      var data = notes;
      alt.dispatcher.dispatch({action, data});
    });

    it('listens for note deleted and removes note', function(){
      var action = noteActions.NOTE_DELETED;
      var data = 1;
      alt.dispatcher.dispatch({action, data});

      expect(wrappedNoteListStore.getState().notes).to.eql([]);
    });

    it('listens for note deleted and removes nothing if DNE', function(){
      var action = noteActions.NOTE_DELETED;
      var data = 99;
      alt.dispatcher.dispatch({action, data});

      expect(wrappedNoteListStore.getState().notes).to.eql(notes);
    });

    it('listens for note delete failure', function(){
      var action = noteActions.NOTE_DELETE_FAILED;
      var data = {errors: {}};
      alt.dispatcher.dispatch({action, data});

      expect(wrappedNoteListStore.getState().notes).to.eql(notes);
      expect(wrappedNoteListStore.getState().error).to.eql(data);
    });

  });

  describe('listens for log out', function(){

    it('clears the note list', function(){
      var action = userActions.LOG_OUT;
      alt.dispatcher.dispatch({action});
      expect(wrappedNoteListStore.getState().notes).to.eql(null);
    });
    
  });

});
