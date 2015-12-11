var React = require('react');
var ReactDOM = require('react-dom');
var BenchStore = require('../stores/benchStore.js');
var ApiUtil = require('../util/apiUtil.js');


var Map = React.createClass({

  _createMarkers: function() {
    var benches = BenchStore.all();
    benches.forEach(function(bench) {
      this._addBenchMarker(bench);
    }.bind(this));
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
  },

  componentWillUnmount: function() {
    this.mapToken.remove();
  },

  componentDidMount: function() {
    // react.findDOMNode deprecated; use ReactDOM instead
    var map = ReactDOM.findDOMNode(this.refs.map);
    var mapOptions = {
      center: {lat: 37.7758, lng: -122.435},
      zoom: 13
    };
    this.map = new google.maps.Map(map, mapOptions);
    this.mapToken = BenchStore.addListener(this._createMarkers);
    google.maps.event.addListener(this.map, 'idle', function(){
      // var bounds = this.map.getBounds();
      // console.log('map has moved, check console to see updated bounds')
      // console.log('center');
      // console.log(bounds.getCenter());
      // console.log("north east");
      // console.log(bounds.getNorthEast());
      // console.log("south west");
      // console.log(bounds.getSouthWest());
      ApiUtil.fetchBenches();
    }.bind(this));
  },

  render: function() {
    return (
      <div className="map" ref="map"></div>
    );
  }
});

module.exports = Map;
