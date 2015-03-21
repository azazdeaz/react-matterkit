var React = require('react');
var Matter = require('../../');
var LiveEditor = require('./react-live-edit/live-editor.jsx');

global.Matter = Matter;
global.React = React;
//
// React.render(<Button/>, document.body);

var CODE = 'return <Matter.Button label="button"/>;';

React.render(<LiveEditor codeText={CODE}/>, document.body);
