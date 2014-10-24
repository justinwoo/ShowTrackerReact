var AppDispatcher = require('../dispatcher/app-dispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/app-constants');
var merge = require('react/lib/merge');

var CHANGE_EVENT = 'change';

var _shows = []; //collection of my shows

/**
 * Create a Show item.
 * @param {title} title The title of the Show
 * @param {episode} episode The episode of the Show
 */
function createShow(title, episode) {
  // maybe time is good enough of an id for now.
  var id = Date.now();
  _shows.push({
    id: id,
    title: title,
    episode: episode,
    editing: false
  });
}

/**
 * Delete a Show item
 * @param {id} id The id of the Show
 */
function deleteShow(id) {
  _shows = _shows.filter(function (entry) {
    return entry.id !== id;
  });
}

/**
 * Update a Show item
 * @param {id} id The id of the Show
 */
function updateShow(id, title, episode) {
  _shows = _shows.map(function (entry) {
    if (entry.id !== id) {
      return entry;
    } else {
      var newShow = entry;
      newShow.title = title;
      newShow.episode = episode;
      newShow.editing = false;
      return newShow;
    }
  });
}

/**
 * Toggle editing mode for a Show item
 * @param {id} id The id of the Show
 */
function toggleEditView(id) {
  _shows = _shows.map(function (entry) {
    if (entry.id !== id) {
      return entry;
    } else {
      var newShow = entry;
      newShow.editing = !newShow.editing;
      return newShow;
    }
  });
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

  /**
   * Set the shows object
   * @param {array} newShows
   */
  setShows: function (newShows) {
    _shows = newShows;
  },

  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
      case AppConstants.SHOW_CREATE: {
        createShow(action.title, action.episode);
        AppStore.emitChange();
        break;
      }

      case AppConstants.SHOW_DELETE: {
        deleteShow(action.id);
        AppStore.emitChange();
        break;
      }

      case AppConstants.SHOW_UPDATE: {
        updateShow(action.id, action.title, action.episode);
        AppStore.emitChange();
        break;
      }

      case AppConstants.TOGGLE_EDIT_VIEW: {
        toggleEditView(action.id);
        AppStore.emitChange();
        break;
      }
    }

    return true; // No errors. Needed by promise in Dispatcher.
  })

});

module.exports = AppStore;
