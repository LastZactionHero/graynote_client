var alt = require('../components/alt');
var NoteActions = require('../actions/NoteActions');
var UserActions = require('../actions/UserActions');
var ShareActions = require('../actions/ShareActions');

class NoteStore {
  constructor() {
    this.note = null;
    this.error = null;
    this.saving = false;
    this.mode = 'view';
    this.bindListeners({
      handleNoteSaveStarted: [NoteActions.CREATE_NOTE, NoteActions.UPDATE_NOTE],
      handleNoteSaveEnded: [NoteActions.NOTE_SAVED, NoteActions.NOTE_FAILED],
      handleNoteSaved: NoteActions.NOTE_SAVED,
      handleNoteFailed: NoteActions.NOTE_FAILED,
      handleNoteFetched: NoteActions.NOTE_FETCHED,
      handleNoteFetchFailed: NoteActions.NOTE_FETCH_FAILED,
      handleClearNote: [UserActions.LOG_OUT, NoteActions.CLEAR_NOTE],
      handleNewNote: NoteActions.NEW_NOTE,
      handleSwitchModeView: NoteActions.SWITCH_MODE_VIEW,
      handleSwitchModeEdit: NoteActions.SWITCH_MODE_EDIT,
      handleShareCreatedSuccess: ShareActions.CREATE_SHARE_SUCCESS,
      handleShareDeleteSuccess: ShareActions.DELETE_SHARE_SUCCESS
    });
  }
  handleShareCreatedSuccess(share){
    if(!this.note.shares){this.note.shares = [];}
    this.note.shares.push(share);
  }
  handleShareDeleteSuccess(share){
    if(!this.note.shares){this.note.shares = [];}
    var shareIdx = this.note.shares.indexOf(share);
    if(shareIdx >= 0){ this.note.shares.splice(shareIdx, 1);}
  }
  handleNoteSaveStarted(){
    this.saving = true
  }
  handleNoteSaveEnded(){
    this.saving = false
  }
  handleNoteSaved(note){
    this.error = null;
    this.note.id = note.id;
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
  handleClearNote() {
    this.mode = 'view';
    this.note = null;
    this.error = null;
  }
  handleNewNote() {
    this.note = {};
    this.error = null;
    this.mode = 'edit';
  }
  handleSwitchModeView() {
    this.mode = 'view';
  }
  handleSwitchModeEdit() {
    this.mode = 'edit';
  }
}

module.exports = alt.createStore(NoteStore, 'NoteStore')
