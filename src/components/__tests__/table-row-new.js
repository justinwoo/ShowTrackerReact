/** @jsx React.DOM */
var React = require('react/addons');
var TestUtils = require('react/addons').addons.TestUtils;
var TableRowNew = require('../table-row-new.js');
var AppStore = require('../../stores/app-store');

var tableRowNew;

describe('TableRowNew', function () {
  beforeEach(function () {
    // clear the app store so we know what to expect
    AppStore.setShows([]);
    tableRowNew = TestUtils.renderIntoDocument(
      <TableRowNew/>
    );
  });

  it('renders correctly', function () {
    expect(tableRowNew).toBeDefined();
    expect(TestUtils.isCompositeComponentWithType(
      tableRowNew, TableRowNew
    )).toBe(true);
  });

  it('puts entries in the store', function () {
    var titleInput = tableRowNew.refs.titleInput.getDOMNode();
    var episodeInput = tableRowNew.refs.episodeInput.getDOMNode();
    var saveButton = tableRowNew.refs.saveButton.getDOMNode();
    titleInput.value = "비정상회담";
    episodeInput.value = 8;
    TestUtils.Simulate.click(saveButton);
    var allShows = AppStore.getAll();
    var myShow = allShows[0];
    expect(allShows.length).toBe(1);
    expect(myShow.id).toBeDefined();
    expect(myShow.title).toBe("비정상회담");
    expect(myShow.episode).toBe(8);
    // do cleanup on the store
    AppStore._shows = [];
  });
});
