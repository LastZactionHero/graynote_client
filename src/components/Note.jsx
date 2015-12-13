var React = require('react');
var NoteStore = require('../stores/NoteStore');
var NoteActions = require('../actions/NoteActions');

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
  done() {
    NoteActions.clearNote();
  },
  render() {
    if(this.state.note) {
      return(
        <div>
          <h2>Note: {this.state.note.id}</h2>
          <h3>Token: {this.props.token}</h3>
          <a className='btn btn-Primary' onClick={this.done}>Done</a>
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
            <textarea
              className='form-control'
              value={this.state.note.body}
              onChange={this.handleBodyChange}></textarea>
          </div>
          <div>Saving...</div>
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
