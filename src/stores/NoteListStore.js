var alt = require('../components/alt');
var NoteActions = require('../actions/NoteActions');

class NoteListStore {
  constructor() {
    this.notes = null;
    this.error = null;
    this.bindListeners({
      handleNotesFetched: NoteActions.NOTES_FETCHED,
      handleNotesFailed: NoteActions.NOTES_FETCHED_FAILED
    });
  }
  handleNotesFetched(notes) {
    this.notes = notes;
    this.error = null;
  }
  handleNotesFailed(error) {
    this.error = error;
  }
}

module.exports = alt.createStore(NoteListStore, 'NoteListStore');
