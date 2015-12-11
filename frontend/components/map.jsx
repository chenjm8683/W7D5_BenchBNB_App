var React = require('react');
var ReactDOM = require('react-dom');
var BenchStore = require('../stores/benchStore.js');
var ApiUtil = require('../util/apiUtil.js');


var Map = React.createClass({

  _consolidateMarkers: function() {
    var newBenches = BenchStore.all();
    var newBenchIds = newBenches.map(function(bench) {
      return bench.id;
    });
    var existingBenchIds = this.renderedBenchMarkers.map(function(benchMarker) {
      return benchMarker.bench.id;
    });

    var toRemoveIdxes = [];
    var toAddIdxes = [];

    existingBenchIds.forEach(function(existingId, idx){
      if (newBenchIds.indexOf(existingId) === -1){
        toRemoveIdxes.push(idx);
      }
    });
    newBenchIds.forEach(function(newId, idx) {
      if (existingBenchIds.indexOf(newId) === -1){
        toAddIdxes.push(idx);
      }
    });
    toRemoveIdxes.forEach( function(existingBenchMarkerIdx) {
      this._removeBenchMarker(existingBenchMarkerIdx);
    }.bind(this));

    toAddIdxes.forEach( function(newBenchIdx) {
      this._addBenchMarker(newBenches[newBenchIdx]);
    }.bind(this));

  },

  _removeBenchMarker: function(idx) {
    this.renderedBenchMarkers[idx].marker.setMap(null);
    this.renderedBenchMarkers.splice(idx, 1);
  },

  _addBenchMarker: function(bench) {
    var pos = new google.maps.LatLng(bench.lat, bench.lng);
    var marker = new google.maps.Marker({
      position: pos,
      map: this.map
    });
    // click listener for testing
    marker.addListener('click', function() {
      console.log(bench.description);
    });
    this.renderedBenchMarkers.push({
      bench: bench,
      marker: marker
    });
  },

  componentWillUnmount: function() {
    this.mapToken.remove();
  },

  componentDidMount: function() {
    this.renderedBenchMarkers = [];


    // react.findDOMNode deprecated; use ReactDOM instead
    var map = ReactDOM.findDOMNode(this.refs.map);
    var mapOptions = {
      center: {lat: 37.7758, lng: -122.435},
      zoom: 13
    };
    this.map = new google.maps.Map(map, mapOptions);
    this.mapToken = BenchStore.addListener(this._consolidateMarkers);
    google.maps.event.addListener(this.map, 'idle', function(){
      var bounds = this.map.getBounds();
      // console.log('map has moved, check console to see updated bounds')
      // console.log('center');
      // console.log(bounds.getCenter());
      // console.log("north east");
      // console.log(bounds.getNorthEast());
      // console.log("south west");
      // console.log(bounds.getSouthWest());
      var latLngBounds = {
        northEast: {
          lat: bounds.getNorthEast().lat(),
          lng: bounds.getNorthEast().lng(),
        },
        southWest: {
          lat: bounds.getSouthWest().lat(),
          lng: bounds.getSouthWest().lng(),
        }
      };
      ApiUtil.fetchBenches(latLngBounds);
      // debugger;
    }.bind(this));
  },

  render: function() {

    return (
      <div className="map" ref="map"></div>
    );
  }
});

module.exports = Map;
