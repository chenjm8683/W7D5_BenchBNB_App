var ApiAction = require('../actions/apiAction.js');

var ApiUtil = {
  fetchBenches: function(latLngBounds){
    //make an api call using AJAX in here
    // debugger;
    $.get('api/benches', {bounds: latLngBounds}, function(benches) {
      // debugger;
      ApiAction.receiveAll(benches);
    });
  }
}



module.exports = ApiUtil;
