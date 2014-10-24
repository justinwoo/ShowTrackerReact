/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/app-actions');

var TableRowEdit = React.createClass({

  propTypes: {
    show: React.PropTypes.shape({
      id: React.PropTypes.number,
      title: React.PropTypes.string,
      episode: React.PropTypes.number
    })
  },

  handleCancel: function () {
    AppActions.toggleEditView(this.props.show.id);
  },

  handleUpdate: function () {
    var id = this.props.show.id;
    var title = this.refs.titleInput.getDOMNode().value;
    var episode = this.refs.episodeInput.getDOMNode().value;
    episode = parseInt(episode);
    AppActions.updateShow(id, title, episode);
  },

  render: function () {
    return (
      <tr className="table-row-edit">
        <td className="table-row-edit-title">
          <input type="text" className="table-row-edit-title-input"
            ref="titleInput" placeholder={this.props.show.title} />
        </td>
        <td className="table-row-edit-episode">
          <input type="number" className="table-row-edit-episode-input"
            ref="episodeInput" placeholder={this.props.show.episode} />
        </td>
        <td className="table-row-update">
          <button className="table-row-update-button"
            ref="updateButton"
            onClick={this.handleUpdate}>
            Update
          </button>
          <button className="table-row-edit-button"
            ref="editButton"
            onClick={this.handleCancel}>
            Cancel
          </button>
        </td>
      </tr>
    );
  }
});

module.exports = TableRowEdit;
