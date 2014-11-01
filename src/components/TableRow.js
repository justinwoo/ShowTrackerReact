var React = require('react');
var AppActions = require('../actions/AppActions');
var ReactComponentWithPureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');

var TableRow = React.createClass({
  mixins: [ReactComponentWithPureRenderMixin],

  propTypes: {
    show: React.PropTypes.shape({
      id: React.PropTypes.number,
      title: React.PropTypes.string,
      episode: React.PropTypes.number
    })
  },

  handleDelete: function () {
    AppActions.deleteShow(this.props.show.id);
  },

  handleEdit: function () {
    AppActions.toggleEditView(this.props.show.id);
  },

  render: function () {
    var show = this.props.show;

    return (
      <tr className="table-row">
        <td className="show-title">{show.title}</td>
        <td className="show-episode">{show.episode}</td>
        <td className="show-action">
          <button onClick={this.handleEdit}>Edit</button>
          <button onClick={this.handleDelete}>Delete</button>
        </td>
      </tr>
    );
  }
});

module.exports = TableRow;
