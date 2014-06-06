/** @jsx React.DOM */
var React = require('react');
var Table = require('./table');

var App = React.createClass({
  render: function () {
    /*jshint ignore:start  */
    return (
      <div>
        <h2>Show Tracker</h2>
        <Table/>
      </div>
    );
    /*jshint ignore:end  */
  }
});

module.exports = App;
