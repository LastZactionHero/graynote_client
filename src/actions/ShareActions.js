var alt = require('../components/alt');
var ShareSource = require('../sources/ShareSource');

class ShareActions {
  createShare(token, note, permissions){
    this.dispatch();
    ShareSource.create(token, note, permissions).then(
      this.actions.createShareSuccess,
      this.actions.createShareFail
    );
  }
  createShareSuccess(share) {
    this.dispatch(share);
  }
  createShareFail(error){
    this.dispatch(error);
  }
  deleteShare(token, share){
    this.dispatch();
    ShareSource.delete(token, share).then(
      this.actions.deleteShareSuccess,
      this.actions.deleteShareFail
    )
  }
  deleteShareSuccess(share){
    this.dispatch(share);
  }
  deleteShareFail(){
    this.dispatch();
  }
}

module.exports = alt.createActions(ShareActions)
