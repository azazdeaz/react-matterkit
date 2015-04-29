var React = require('react');
var style = require('./style');

var Label = React.createClass({
  render() {
    return <span style={style.label}>
      {this.props.children}
    </span>;
  }
});

module.exports = Label;
