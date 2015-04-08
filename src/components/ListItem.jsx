var React = require('react/addons');
var { PureRenderMixin } = React;
var { StyleResolverMixin, BrowserStateMixin } = require('radium');
var style = require('./style');
var has = require('lodash.has');

var ListItem = React.createClass({

  mixins: [ PureRenderMixin, StyleResolverMixin, BrowserStateMixin ],

  getDefaultProps() {
    return {selected: false};
  },
  render() {

    var label = has(this.props, 'label') ?
      this.props.label : this.props.children;

    return <div
      {...this.getBrowserStateEvents()}
      style={this.buildStyles(style.listItem, {selected: this.props.selected})}
      onClick={this.props.onClick}>

      {label}
    </div>;
  }
});

module.exports = ListItem;
