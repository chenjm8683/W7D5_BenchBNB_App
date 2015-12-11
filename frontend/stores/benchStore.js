var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');

var BenchStore = new Store(AppDispatcher);
var BenchConstants = require('../constants/benchConstants');

var _benches = [];

BenchStore.all = function () {
  return _benches.slice(0);
};

BenchStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case BenchConstants.BENCHES_RECEIVED:
      var result = resetBenches(payload.benches);
      BenchStore.__emitChange();
      break;
  }
};


var resetBenches = function(benches) {
  _benches = benches;
};



module.exports = BenchStore;
