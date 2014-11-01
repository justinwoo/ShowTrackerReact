jest.dontMock('../TableRowNew');
jest.dontMock('../../stores/AppStore');
var React = require('react/addons');
var TestUtils = require('react/addons').addons.TestUtils;
var TableRowNew = require('../TableRowNew');
var AppStore = require('../../stores/AppStore');
var InitialState = require('./fixtures/InitialState');

var tableRowNew;

describe('TableRowNew', function () {
  beforeEach(function () {
    // clear the app store so we know what to expect
    AppStore.setAppState(InitialState);
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
});
