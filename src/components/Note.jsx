var React = require('react');
var NoteStore = require('../stores/NoteStore');
var NoteActions = require('../actions/NoteActions');
var ResizeTextArea = require('react-textarea-autosize');

var Note = React.createClass({
  getInitialState() {
    return NoteStore.getState();
  },
  componentDidMount() {
    NoteStore.listen(this.onChange);
  },
  componentWillUnmount() {
    NoteStore.unlisten(this.onChange);
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
  handleBodyChange(e) {
    var state = this.state;
    state.note.body = e.target.value;
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
  render() {
    if(this.state.note) {
      if(this.state.mode == 'edit') {
        return(
          <div>
            <div className='form-group'>
              <label>Title</label>
              <input
                type='text'
                className='form-control'
                value={this.state.note.title}
                onChange={this.handleTitleChange}></input>
            </div>
            <div className='form-group'>
              <label>Note</label>
              <ResizeTextArea
                className='form-control js-auto-size'
                value={this.state.note.body}
                onChange={this.handleBodyChange}></ResizeTextArea>
            </div>
            <hr/>
            {this.state.note.id ?
              <a href='#' className='btn btn-success' onClick={this.handleViewMode}>
                <i className='fa fa-check'></i>&nbsp;&nbsp;Done
              </a> : ''
            }
          </div>
        )
      } else {
        return(
          <div>
            <h2>
              <a href='#' className='btn btn-success' onClick={this.handleEditMode}>
                <i className='fa fa-pencil'></i>
              </a>&nbsp;&nbsp;
              {this.state.note.title}
            </h2>
            <hr/>
            {this.state.note.body.split("\n").map(function(block) {
              return (
                <p>
                  {block}
                </p>
              )
            })}
          </div>
        )
      }
    } else {
      return(
        <h2>No Active Note</h2>
      )
    }
  }
});

module.exports = Note;
