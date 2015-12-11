var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');

var BenchStore = new Store(AppDispatcher);
var BenchConstants = require('../constants/benchConstants');

var _benches = [];

var resetBenches = function(benches) {
  _benches = benches;
};

BenchStore.all = function () {
  return _benches.slice();
};

BenchStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case BenchConstants.BENCHES_RECEIVED:
      resetBenches(payload.benches);
      BenchStore.__emitChange();
      break;
  }
};

module.exports = BenchStore;
