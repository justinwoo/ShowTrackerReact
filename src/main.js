var React = require('react/addons');
var App = require('./components/app');
var AppActions = require('./actions/AppActions');

React.renderComponent(App(), document.getElementById('main'));

// demo stuff
AppActions.createShow(
  'my test show',
  1
);
