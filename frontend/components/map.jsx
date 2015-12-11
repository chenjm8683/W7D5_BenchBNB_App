var React = require('react');
var ReactDOM = require('react-dom');
var BenchStore = require('../stores/benchStore.js');

var Map = React.createClass({

  componentDidMount: function() {
    // react.findDOMNode deprecated; use ReactDOM instead
    var map = ReactDOM.findDOMNode(this.refs.map);
    var mapOptions = {
      center: {lat: 37.7758, lng: -122.435},
      zoom: 13
    };
    this.map = new google.maps.Map(map, mapOptions);
  },

  render: function() {
    return (
      <div className="map" ref="map"></div>
    );
  }
});

module.exports = Map;
