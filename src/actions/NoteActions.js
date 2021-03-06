var alt = require('../components/alt');
var NoteSource = require('../sources/NoteSource');

class NoteActions {
  newNote() {
    this.dispatch();
  }
  clearNote() {
    this.dispatch();
  }
  showNote(token, id) {
    this.dispatch();
    NoteSource.show(token, id).then(
      this.actions.noteFetched,
      this.actions.noteFetchFailed
    )
  }
  listNotes(token, query) {
    this.dispatch();

    NoteSource.index(token, query).then(
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
  deleteNote(token, id) {
    this.dispatch();
    NoteSource.delete(token, id).then(
      this.actions.noteDeleted,
      this.actions.noteDeleteFailed);
  }
  noteDeleted(id){
    this.dispatch(id);
  }
  noteDeleteFailed(error){
    this.dispatch(error);
  }
  switchModeView() {
    this.dispatch();
  }
  switchModeEdit() {
    this.dispatch();
  }
}

module.exports = alt.createActions(NoteActions)
