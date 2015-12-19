var alt = require('../components/alt');

class SearchActions {
  updateQuery(query) {
    this.dispatch(query);
  }
  clearQuery() {
    this.dispatch();
  }
}

module.exports = alt.createActions(SearchActions);
