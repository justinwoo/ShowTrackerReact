var AppDispatcher = require('../dispatcher/app-dispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/app-constants');
var merge = require('react/lib/merge');

var CHANGE_EVENT = 'change';

var _shows = {
  '0': {
    id: '0',
    title: 'Title-0',
    episode: 0
  },
  '1': {
    id: '1',
    title: 'Title-1',
    episode: 1
  }
}; //collection of my shows

/**
 * Create a Show item.
 * @param {title} The title of the Show
 * @param {episode} The episode of the Show
 */
function createShow(title, episode) {
  // maybe time is good enough of an id for now.
  var id = Date.now();
  _shows[id] = {
    id: id,
    title: title,
    episode: episode
  };
}

/**
 * Delete a Show item
 * @param {id} The id of the Show
 */
function deleteShow(id) {
  delete _shows[id];
}

var AppStore = merge(EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  /**
   * Get all the shows.
   * @return {object}
   */
  getAll: function () {
    return _shows;
  },

  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
    case AppConstants.SHOW_CREATE:
        createShow(action.title, action.episode);
        AppStore.emitChange();
        break;

      case AppConstants.SHOW_DELETE:
        deleteShow(action.id);
        AppStore.emitChange();
        break;

      case AppConstants.SHOW_UPDATE:
        AppStore.emitChange();
        break;

      // add more cases for other actionTypes, like TODO_UPDATE, etc.
    }

    return true; // No errors. Needed by promise in Dispatcher.
  })

});

module.exports = AppStore;
