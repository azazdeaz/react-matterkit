var React = require('react');
var Input = require('./Input.jsx');

var StringInput = React.createClass({
  render() {
    return <Input type='text' {...this.props}/>;
  }
});

module.exports = StringInput;
