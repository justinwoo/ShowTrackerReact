/** @jsx React.DOM */
var React = require('react');
var TableRow = require('./table-row');
var TableRowEdit = require('./table-row-edit');
var TableRowNew = require('./table-row-new');
var AppStore = require('../stores/app-store');

function getAppState() {
  return {
    shows: AppStore.getAll()
  };
}

var Table = React.createClass({

  getInitialState: function() {
    return getAppState();
  },

  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },

  _onChange: function () {
    this.setState(getAppState());
  },

  render: function () {
    /*jshint ignore:start  */
    var showComponents = [];
    var shows = this.state.shows;
    for (var key in shows) {
      var show = shows[key];
      if (!show.editing) {
        showComponents.push(<TableRow show={show}/>);
      } else {
        showComponents.push(<TableRowEdit show={show}/>);
      }
    }

    return (
      <table>
        <thead>
          <tr>
            <td>Title</td>
            <td>Episode</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {showComponents}
        </tbody>
        <tfoot>
          <TableRowNew/>
        </tfoot>
      </table>
    );
    /*jshint ignore:end  */
  }
});

module.exports = Table;
