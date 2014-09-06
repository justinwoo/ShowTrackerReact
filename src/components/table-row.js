/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/app-actions');

var TableRow = React.createClass({

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

  render: function () {
    /*jshint ignore:start  */
    var show = this.props.show;

    return (
      <tr className="table-row">
        <td className="show-title">{show.title}</td>
        <td className="show-episode">{show.episode}</td>
        <td className="show-delete"><button onClick={this.handleDelete}>Delete</button></td>
      </tr>
    );
    /*jshint ignore:end  */
  }
});

module.exports = TableRow;
