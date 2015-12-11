var React = require('react');
var BenchStore = require('../stores/benchStore.js');
// var ApiUtil = require('../util/apiUtil.js');

var Index = React.createClass({
  getInitialState: function() {
    return ({
      benches: BenchStore.all()
    });
  },

  _updateState: function() {
    this.setState({
      benches: BenchStore.all()
    });
  },

  componentWillUnmount: function() {
    this.indexToken.remove();
  },

  componentDidMount: function() {
    this.indexToken = BenchStore.addListener(this._updateState);
    // make fetchBenches an idle event of google map
    // ApiUtil.fetchBenches();
  },

  render: function() {
    // console.log(this.state.benches);

    return (
      <div>
        To be implemented:
      </div>
    );
  }
});

module.exports = Index;
