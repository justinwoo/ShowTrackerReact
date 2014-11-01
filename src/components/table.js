var React = require('react');
var TableRow = require('./TableRow');
var TableRowEdit = require('./TableRowEdit');
var TableRowNew = require('./TableRowNew');

var Table = React.createClass({

  render: function () {
    /*jshint ignore:start  */
    var showComponents = [];
    var shows = this.props.shows;
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
