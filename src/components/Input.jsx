var React = require('react');
var { StyleResolverMixin, BrowserStateMixin } = require('radium');
var _ = require('lodash');
var style = require('./style');

var Input = React.createClass({

  mixins: [ StyleResolverMixin, BrowserStateMixin ],

  getDefaultProps() {
    return {
      disabled: false,
    };
  },
  getInitialState() {
    return {
      error: false,
    };
  },
  render: function () {

    return <input
      {...this.getBrowserStateEvents()}
      style={this.buildStyles(style.input, {disabled: this.props.disabled})}
      value = {this.props.value}
      type={this.props.type}
      onChange = {e => this.props.onChange(e.target.value)}
      disabled = {this.props.disabled}
    ></input>;
  }
});

module.exports = Input;
