var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var InitialState = require('../state/InitialState.js');
var assign = require('react/lib/Object.assign');

var CHANGE_EVENT = 'change';

var _appState = InitialState;

/**
 * Create a Show item.
 * @param {title} title The title of the Show
 * @param {episode} episode The episode of the Show
 */
function createShow(title, episode) {
  // maybe time is good enough of an id for now.
  var id = Date.now();
  _appState.shows.push({
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
  _appState.shows = _appState.shows.filter(function (entry) {
    return entry.id !== id;
  });
}

/**
 * Update a Show item
 * @param {id} id The id of the Show
 */
function updateShow(id, title, episode) {
  _appState.shows = _appState.shows.map(function (entry) {
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
  _appState.shows = _appState.shows.map(function (entry) {
    if (entry.id !== id) {
      return entry;
    } else {
      var newShow = entry;
      newShow.editing = !newShow.editing;
      return newShow;
    }
  });
}

var AppStore = assign({}, EventEmitter.prototype, {

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
   * Set the application state
   * @param {object} appState the new appState
   */
  setAppState: function (appState) {
    _appState = appState;
  },

  /**
   * Get the application state
   * @return {object} application state
   */
  getAppState: function () {
    return _appState;
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
