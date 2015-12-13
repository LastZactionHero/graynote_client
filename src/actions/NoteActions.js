var alt = require('../components/alt');
var NoteSource = require('../sources/NoteSource')

class NoteActions {
  clearNote() {
    this.dispatch()
  }
  showNote(token, id) {
    this.dispatch();
    NoteSource.show(token, id).then(
      this.actions.noteFetched,
      this.actions.noteFetchFailed
    )
  }
  listNotes(token) {
    this.dispatch();
    NoteSource.index(token).then(
      this.actions.notesFetched,
      this.actions.notesFetchedFailed
    );
  }
  createNote(token, title, body) {
    this.dispatch();
    NoteSource.create(token, title, body).then(
      this.actions.noteSaved,
      this.actions.noteFailed);
  }
  updateNote(token, id, title, body) {
    this.dispatch();
    NoteSource.update(token, id, title, body).then(
      this.actions.noteSaved,
      this.actions.noteFailed);
  }
  noteSaved(note) {
    this.dispatch(note);
  }
  noteFailed(error) {
    this.dispatch(error);
  }
  notesFetched(notes){
    this.dispatch(notes)
  }
  notesFetchedFailed(error){
    this.dispatch(error);
  }
  noteFetched(note) {
    this.dispatch(note)
  }
  noteFetchFailed(error) {
    this.dispatch(error)
  }
}

module.exports = alt.createActions(NoteActions)
