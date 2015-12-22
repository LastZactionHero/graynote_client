var alt = require('../components/alt');
var NoteActions = require('../actions/NoteActions');
var UserActions = require('../actions/UserActions');

class NoteListStore {
  constructor() {
    this.notes = null;
    this.error = null;
    this.bindListeners({
      handleNotesFetched: NoteActions.NOTES_FETCHED,
      handleNotesFailed: NoteActions.NOTES_FETCHED_FAILED,
      handleNoteDeleted: NoteActions.NOTE_DELETED,
      handleNoteDeleteFailed: NoteActions.NOTE_DELETE_FAILED,
      handleNotesCleared: UserActions.LOG_OUT
    });
  }
  handleNotesCleared() {
    this.notes = null;
    this.error = null;
  }
  handleNotesFetched(notes) {
    this.notes = notes;
    this.error = null;
  }
  handleNotesFailed(error) {
    this.error = error;
  }
  handleNoteDeleted(noteId) {
    var newNotes = [];
    for(var i = 0; i < this.notes.length; i++){
      if(this.notes[i].id != noteId){newNotes.push(this.notes[i]);}
    }
    this.notes = newNotes;
  }
  handleNoteDeleteFailed(error) {
    this.error = error;
  }
}

module.exports = alt.createStore(NoteListStore, 'NoteListStore');
