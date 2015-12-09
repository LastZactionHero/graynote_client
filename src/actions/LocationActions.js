var alt = require("../components/alt")
var LocationSource = require("../sources/LocationSource")

class LocationActions {
  updateLocations(locations) {
    console.log("updateLocations")
    console.log(locations)
    this.dispatch(locations)
  }
  fetchTheLocations() {
    this.dispatch();
    LocationSource.fetch()
      .then((locations) => {
        this.actions.updateLocations(locations);
      })
      .catch((errorMessage) => {
        this.actions.locationsFailed(errorMessage);
      });
  }
  locationsFailed(errorMessage) {
    this.dispatch(errorMessage)
  }
}

module.exports = alt.createActions(LocationActions)
