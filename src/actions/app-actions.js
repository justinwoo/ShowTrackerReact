var AppDispatcher = require('../dispatcher/app-dispatcher');
var AppConstants = require('../constants/app-constants');

var AppActions = {
  createShow: function (title, episode) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.SHOW_CREATE,
      title: title,
      episode: episode
    });
  },
  deleteShow: function (id) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.SHOW_DELETE,
      id: id
    });
  }
};

module.exports = AppActions;
