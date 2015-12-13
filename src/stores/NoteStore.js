var alt = require('../components/alt');
var NoteActions = require('../actions/NoteActions');

class NoteStore {
  constructor() {
    this.note = null;
    this.error = null;
    this.bindListeners({
      handleNoteSaved: NoteActions.NOTE_SAVED,
      handleNoteFailed: NoteActions.NOTE_FAILED,
      handleNoteFetched: NoteActions.NOTE_FETCHED,
      handleNoteFetchFailed: NoteActions.NOTE_FETCH_FAILED
    });
  }
  handleNoteSaved(note){
    this.error = null;
    this.note = note;
  }
  handleNoteFailed(error){
    this.error = error;
  }
  handleNoteFetched(note){
    this.note = note;
    this.error = null;
  }
  handleNoteFetchFailed(error){
    this.error = error;
  }
}

module.exports = alt.createStore(NoteStore, 'NoteStore')
