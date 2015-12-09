var alt = require("../components/alt")
var LocationActions = require("../actions/LocationActions")

class LocationStore {
  constructor() {
    this.locations = [];
    this.errorMessage = null;
    this.bindListeners({
      handleUpdateLocations: LocationActions.UPDATE_LOCATIONS,
      handleFetchLocations: LocationActions.FETCH_THE_LOCATIONS,
      handleLocationsFailed: LocationActions.LOCATIONS_FAILED
    });
  }

  handleUpdateLocations(locations) {
    this.locations = locations;
    this.errorMessage = null;
  }
  handleFetchLocations() {
    this.locations = [];
  }
  handleLocationsFailed(errorMessage) {
    this.errorMessage = errorMessage;
  }
}

module.exports = alt.createStore(LocationStore, 'LocationStore')
