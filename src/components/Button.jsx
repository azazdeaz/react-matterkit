var React = require('react');
var { StyleResolverMixin, BrowserStateMixin } = require('radium');
var _ = require('lodash');
var style = require('./style');
var Icon = require('./Icon');
var Base = require('./Base');

var Button = React.createClass({

  mixins: [ StyleResolverMixin, BrowserStateMixin ],

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

    return <div
      {...this.getBrowserStateEvents()}
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
