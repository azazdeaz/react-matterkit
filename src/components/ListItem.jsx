var React = require('react');
var style = require('./style');

var ListItem = React.createClass({

  getInitialState() {
    return { hover: false };
  },

  onMouseEnter() { this.setState({hover: true}); },
  onMouseLeave() { this.setState({hover: false}); },
  render() {

    var s;
    if (this.state.hover) s = style.listItemHover;
    else s = style.listItem;

    return <div
      style = {s}
      onMouseEnter = {this.onMouseEnter}
      onMouseLeave = {this.onMouseLeave}
      onClick={this.props.onClick}
    >
      {this.props.value}
    </div>;
  }
});

module.exports = ListItem;
