var React = require('react');
var NoteStore = require('../stores/NoteStore');
var NoteActions = require('../actions/NoteActions');
var ResizeTextArea = require('react-textarea-autosize');
var Quill = require('../../node_modules/quill/dist/quill.js');

var Note = React.createClass({
  getInitialState() {
    this.quillEditor = null;
    return NoteStore.getState();
  },
  componentDidMount() {
    NoteStore.listen(this.onChange);
    this.configureQuill();
  },
  componentWillUnmount() {
    NoteStore.unlisten(this.onChange);
  },
  configureQuill() {
    this.quillEditor = new Quill('.noteEditor')
    this.quillEditor.addModule('toolbar', { container: '.noteToolbar' });
    if(this.state.note.body){
      this.quillEditor.setHTML(this.state.note.body);
    }
    var noteCtx = this;
    this.quillEditor.on('text-change', function(delta, source){
      noteCtx.handleBodyChange(noteCtx.quillEditor.getHTML());
    });
  },
  onChange(state) {
    this.setState(state)
  },
  handleTitleChange(e) {
    var state = this.state;
    state.note.title = e.target.value;
    this.setState(state);
    this.saveChanges();
  },
  handleBodyChange(text){
    var state = this.state;
    state.note.body = text;
    this.setState(state);
    this.saveChanges();
  },
  saveChanges() {
    if(!this.state.note.title || !this.state.note.body){return;}

    if(this.state.note.id){
      NoteActions.updateNote(
        this.props.token,
        this.state.note.id,
        this.state.note.title.trim(),
        this.state.note.body.trim());
    } else {
      NoteActions.createNote(
        this.props.token,
        this.state.note.title.trim(),
        this.state.note.body.trim());
    }
  },
  handleViewMode(e) {
    e.preventDefault();
    NoteActions.switchModeView();
  },
  handleEditMode(e){
    e.preventDefault();
    NoteActions.switchModeEdit();
  },
  done() {
    NoteActions.clearNote();
  },
  createBodyMarkup(e) {
    return {__html: this.state.note.body};
  },
  render() {
    if(this.state.note) {
      return(
        <div>
        <div className={this.state.mode == 'edit' ? "hidden" : ""}>
          <h2>
            <a href='#' className='btn btn-success' onClick={this.handleEditMode}>
              <i className='fa fa-pencil'></i>
            </a>&nbsp;&nbsp;
            {this.state.note.title}
          </h2>
          <hr/>
          <div dangerouslySetInnerHTML={this.createBodyMarkup()}></div>
        </div>

        <div className={this.state.mode == 'edit' ? "" : "hidden"}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control input-lg'
              value={this.state.note.title}
              placeholder="Note Title"
              onChange={this.handleTitleChange}></input>
          </div>
          <div className='form-group'>
            <label>Note</label>
            <div className="noteToolbar">
              <select tabIndex="-1" className="ql-size input-sm btn btn-default">
                <option value="10px">Small</option>
                <option value="13px" selected>Normal</option>
                <option value="18px">Large</option>
                <option value="32px">Huge</option>
              </select>
              <button tabIndex="-1" className="btn btn-default ql-bold">
                <i className="fa fa-bold"></i>
              </button>
              <button tabIndex="-1" className="btn btn-default ql-italic">
                <i className="fa fa-italic"></i>
              </button>
              <button tabIndex="-1" className="btn btn-default ql-strike">
                <i className="fa fa-strikethrough"></i>
              </button>
              <button tabIndex="-1" className="btn btn-default ql-underline">
                <i className="fa fa-underline"></i>
              </button>
            </div>

            <div className='noteEditor' tabindex="1"></div>
          </div>
          <hr/>
          {this.state.note.id ?
            <a href='#' className='btn btn-success' onClick={this.handleViewMode}>
              <i className='fa fa-check'></i>&nbsp;&nbsp;Done
            </a> : ''
          }
        </div>
        </div>
      )
    } else {
      return(
        <h2>No Active Note</h2>
      )
    }
  }
});

module.exports = Note;
