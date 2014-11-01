var React = require('react/addons');
var TestUtils = require('react/addons').addons.TestUtils;
var TableRowEdit = require('../TableRowEdit.js');
var AppStore = require('../../stores/AppStore');
var InitialState = require('./fixtures/InitialState');
var assign = require('react/lib/Object.assign');

var tableRowEdit;

describe('TableRowEdit', function () {
  beforeEach(function () {
    var newState = assign({}, InitialState, {
      shows: [{
        id: 0,
        title: "ゆるゆり",
        epsiode: 0
      }]
    });
    AppStore.setAppState(newState);
    var appState = AppStore.getAppState();
    tableRowEdit = TestUtils.renderIntoDocument(
      <TableRowEdit show={appState.shows[0]}/>
    );
  });

  it('renders correctly', function () {
    expect(tableRowEdit).toBeDefined();
    expect(TestUtils.isCompositeComponentWithType(
      tableRowEdit, TableRowEdit
    )).toBe(true);
  });
});
