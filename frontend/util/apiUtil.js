var ApiAction = require('../actions/apiAction.js');

var ApiUtil = {
  fetchBenches: function(){
    //make an api call using AJAX in here
    $.get('api/benches', {}, function(benches) {
      ApiAction.receiveAll(benches);
    });
  }
}



module.exports = ApiUtil;
