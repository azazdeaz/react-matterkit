var React = require('react');
var Input = require('./Input');

var StringInput = React.createClass({
  render() {
    return <Input type='text' {...this.props}/>;
  }
});

module.exports = StringInput;
