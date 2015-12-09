var React = require("react");
var LocationStore = require("../stores/LocationStore")
var LocationActions = require("../actions/LocationActions")

var Locations = React.createClass({
  getInitialState() {
    console.log(LocationStore.getState());
    return LocationStore.getState();
  },
  componentDidMount() {
    LocationStore.listen(this.onChange);
    LocationActions.fetchTheLocations();
  },
  componentWillUnmount() {
    LocationStore.unlisten(this.onChange);
  },
  onChange(state) {
    console.log("onChange")
    console.log(state)
    this.setState(state);
  },
  render() {
    if (this.state.errorMessage) {
      return (
        <div>Something is wrong.</div>
      )
    }
    if (!this.state.locations.length) {
      return(
        <div>loading</div>
      )
    }
    return(
      <ul>
        {this.state.locations.map((location) => {
          return(
            <li>{location.name}</li>
          );
        })}
      </ul>
    );
  }
});

module.exports = Locations;
