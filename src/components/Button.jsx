var React = require('react/addons');
var {PureRenderMixin} = React;
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
    if (this.props.icon || this.props.iconClassName) {
      icon = <Icon
        icon={this.props.icon}
        className={this.props.iconClassName}
        style={{marginRight:this.props.text ? 4 : 0}}/>;
    }

    return <div
      {...this.getBasics()}
      {...this.getBrowserStateEvents()}
      style={this.buildStyles(style.button)}

      onClick={this.props.onClick}>
      {icon}
      {this.props.label}
    </div>;
  }
});

module.exports = Button;
