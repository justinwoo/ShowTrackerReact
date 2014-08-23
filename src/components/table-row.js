/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/app-actions');

var TableRow = React.createClass({

  handleDelete: function () {
    AppActions.deleteShow(this.props.show.id);
  },

  render: function () {
    /*jshint ignore:start  */
    var show = this.props.show;

    return (
      <tr>
        <td>{show.title}</td>
        <td>{show.episode}</td>
        <td><button onClick={this.handleDelete}>Delete</button></td>
      </tr>
    );
    /*jshint ignore:end  */
  }
});

module.exports = TableRow;
