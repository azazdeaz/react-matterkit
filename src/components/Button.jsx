var React = require('react');
var { StyleResolverMixin, BrowserStateMixin } = require('radium');
var _ = require('lodash');
var style = require('./style');
var Icon = require('./Icon');
var BasicMixin = require('../utils/BasicMixin');

var Button = React.createClass({

  mixins: [BasicMixin, StyleResolverMixin, BrowserStateMixin],

  getDefaultProps() {
    return {
      label: '',
      kind: 'normal',
      disabled: false,
    };
  },

  getInitialState() {
    return {
      toggled: false,
    };
  },

  render() {

    var icon;
    if (this.props.icon) {
      icon = <Icon icon={this.props.icon}
        style={{marginRight:this.props.text ? 4 : 0}}/>;
    }

    console.log('bs',this.buildStyles(style.button))

    return <div
      {...this.getBrowserStateEvents()}
      {...this.getBasics()}
      style={this.buildStyles(style.button)}

      tooltip={this.props.tooltip}
      dropdownMenu={this.props.dropdownMenu}
      onClick={this.props.onClick}>
      {icon}
      {this.props.label}
    </div>;
  }
});

module.exports = Button;
