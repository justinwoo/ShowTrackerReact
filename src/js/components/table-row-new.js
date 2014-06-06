/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/app-actions');

var TableRowNew = React.createClass({

  handleSave: function () {
    var title = this.refs.titleInput.getDOMNode().value;
    var episode = this.refs.episodeInput.getDOMNode().value;
    if (title && episode) {
      AppActions.createShow(title, episode);
    }

  },

  render: function () {
    /*jshint ignore:start  */
    return (
      <tr>
        <td>
          <input ref="titleInput" type="text" placeholder="New Title" />
        </td>
        <td>
          <input ref="episodeInput" type="number" placeholder="Episode" />
        </td>
        <td><button onClick={this.handleSave}>Save</button></td>
      </tr>
    );
    /*jshint ignore:end  */
  }
});

module.exports = TableRowNew;
