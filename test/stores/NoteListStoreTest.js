/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import alt from 'components/alt';
import wrappedNoteListStore, {NoteListStore} from 'stores/NoteListStore';
import noteActions from 'actions/NoteActions';

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

});
