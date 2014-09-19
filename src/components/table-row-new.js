/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/app-actions');

var TableRowNew = React.createClass({

  handleSave: function () {
    var title = this.refs.titleInput.getDOMNode().value;
    var episode = this.refs.episodeInput.getDOMNode().value;
    episode = parseInt(episode);
    AppActions.createShow(title, episode);
  },

  render: function () {
    /*jshint ignore:start  */
    return (
      <tr className="table-row-new">
        <td className="table-row-new-title">
          <input type="text" className="table-row-new-title-input"
            ref="titleInput" placeholder="New Title" />
        </td>
        <td className="table-row-new-episode">
          <input type="number" className="table-row-new-episode-input"
            ref="episodeInput" placeholder="Episode" />
        </td>
        <td className="table-row-new-save">
          <button className="table-row-new-save-button"
            ref="saveButton"
            onClick={this.handleSave}>
            Save
          </button>
        </td>
      </tr>
    );
    /*jshint ignore:end  */
  }
});

module.exports = TableRowNew;
