var alt = require('../components/alt');
var SearchActions = require('../actions/SearchActions');

class SearchStore {
  constructor() {
    this.query = null;
    this.bindListeners({
      handleUpdateQuery: SearchActions.UPDATE_QUERY,
      handleClearQuery: SearchActions.CLEAR_QUERY
    })
  }
  handleUpdateQuery(query){
    this.query = query;
  }
  handleClearQuery(){
    this.query = null;
  }
}

module.exports = alt.createStore(SearchStore, 'SearchStore');
