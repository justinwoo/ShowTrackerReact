/** @jsx React.DOM */
var React = require('react/addons');
var TestUtils = require('react/addons').addons.TestUtils;
var TableRow = require('../table-row.js');

var tableRow;

describe('TableRow', function () {
  beforeEach(function () {
    var myShow = {
      id: 1,
      title: 'ゆゆ式',
      episode: 34
    };
    tableRow = TestUtils.renderIntoDocument(
      <TableRow show={myShow}/>
    );
  });

  it('renders correctly', function () {
    expect(tableRow).toBeDefined();
    expect(TestUtils.isCompositeComponentWithType(
      tableRow, TableRow
    )).toBe(true);
  });

  it('has the correct content', function () {
    expect(tableRow.props.show.id).toBe(1);
    expect(tableRow.props.show.title).toBe('ゆゆ式');
    expect(tableRow.props.show.episode).toBe(34);
  });
});
