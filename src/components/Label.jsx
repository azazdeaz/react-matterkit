var React = require('react');

var Label = React.createClass({
  render() {
    return <span>{this.props.children}</span>;
  }
});

module.exports = Label;
