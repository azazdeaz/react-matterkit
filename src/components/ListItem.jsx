var React = require('react/addons');
var { PureRenderMixin } = React;
var { StyleResolverMixin, BrowserStateMixin } = require('radium');
var style = require('./style');
var has = require('lodash/object/has');

var ListItem = React.createClass({

  mixins: [ PureRenderMixin, StyleResolverMixin, BrowserStateMixin ],

  getDefaultProps() {
    return {selected: false};
  },

  render() {

    var label = has(this.props, 'label') ?
      this.props.label : this.props.children;

    var value = has(this.props, 'value') ? this.props.value : label;

    if (label) label = value;

    return <div
      {...this.getBrowserStateEvents()}
      style={this.buildStyles(style.listItem, {selected: this.props.selected})}
      onClick={() => {
        if (this.props.onClick) {
          this.props.onClick(value);
        }
      }}>

      {label}
    </div>;
  }
});

module.exports = ListItem;
