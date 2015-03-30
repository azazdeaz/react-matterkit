var React = require('react');
var _ = require('lodash');
var style = require('./style');

module.exports = Checkbox;

var Checkbox = React.createClass({

  getDefaultProps() {
    return {value: false};
  },
  getInitialState() {
    return {
      disabled: false,
      down: false,
      hover: false,
    };
  },
  onMouseDown() {
    this.setState({down: true});
    window.addEventListener('mouseup', this.onMouseUp);
  },
  onMouseUp() {
    this.setState({down: false});
    window.removeEventListener('mouseup', this.onMouseUp);
  },
  render: function () {

    var s = style.checkbox.normal;
    if (this.state.disabled) s = style.checkbox.disabled;
    else if (this.state.down) s = style.checkbox.active;
    else if (this.state.hover) s = style.checkbox.hover;

    if (this.props.value && !this.state.disabled) {
      s = _.assign({backgroundImage: `url('${style.uri.check}')`}, s);
    }

    return <div
      style = {s}
      value = {this.props.value}
      type={this.props.type}
      onClick = {e => this.props.onChange(!this.props.value)}
      onMouseEnter={() => this.setState({hover: true})}
      onMouseLeave={() => this.setState({hover: false})}
      onMouseDown={() => this.onMouseDown}
      disabled = {this.state.disabled}
    ></div>;
  }
});

module.exports = Checkbox;
