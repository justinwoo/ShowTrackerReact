/** @jsx React.DOM */
var React = require('react/addons');
var TestUtils = require('react/addons').addons.TestUtils;
var TableRowEdit = require('../table-row-edit.js');
var AppStore = require('../../stores/app-store');

var tableRowEdit;

describe('TableRowEdit', function () {
  beforeEach(function () {
    AppStore.setShows([{
      id: 0,
      title: "ゆるゆり",
      epsiode: 0
    }]);
    var shows = AppStore.getAll();
    tableRowEdit = TestUtils.renderIntoDocument(
      <TableRowEdit show={shows[0]}/>
    );
  });

  it('renders correctly', function () {
    expect(tableRowEdit).toBeDefined();
    expect(TestUtils.isCompositeComponentWithType(
      tableRowEdit, TableRowEdit
    )).toBe(true);
  });

  it('edits shows correctly', function () {
    var title = this.refs.titleInput.getDOMNode().value;
    var episode = this.refs.episodeInput.getDOMNode().value;
  });

});
