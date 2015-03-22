var React = require('react');
var Matter = require('../../');
var LiveEditor = require('./react-live-edit/live-editor.jsx');

var CODE = 'return <Matter.Button label="button"/>;';

module.exports = React.createClass({
  render() {
    return <LiveEditor codeText={CODE}/>;
  }
});
