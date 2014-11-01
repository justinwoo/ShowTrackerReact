var React = require('react');
var Table = require('./table');
var AppStore = require('../stores/AppStore');

var App = React.createClass({
  getInitialState: function() {
    return AppStore.getAppState();
  },

  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },

  _onChange: function () {
    this.setState(AppStore.getAppState());
  },

  render: function () {
    /*jshint ignore:start  */
    return (
      <div>
        <h2>Show Tracker</h2>
        <Table
          shows={this.state.shows}
        />
      </div>
    );
    /*jshint ignore:end  */
  }


});

module.exports = App;
