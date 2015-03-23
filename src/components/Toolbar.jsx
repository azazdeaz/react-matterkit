var React = require('react');
var style = require('./style');

var Toolbar = React.createClass({
  render() {
    return <div
      style={style.toolbar}
      onClick={this.props.onClick}>
      {this.props.children}
    </div>;
  }
});

module.exports = Toolbar;
