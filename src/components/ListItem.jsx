var React = require('react/addons');
var { PureRenderMixin } = React;
var Radium = require('radium');
var assign = require('lodash/object/assign');
var BasicMixin = require('../utils/BasicMixin');
var has = require('lodash/object/has');
var assign = require('lodash/object/assign');

var ListItem = React.createClass(Radium.wrap({

  mixins: [BasicMixin, PureRenderMixin],

  getDefaultProps() {
    return {selected: false};
  },

  render() {

    var {mod, style, selected, label, children, value} = this.props;

    mod = assign({selected}, mod);
    value = value || label;
    label = label || children || value;

    return <div
      {...this.getBasics()}
      style={this.getStyle('listItem', mod, style)}
      onClick={() => {
        if (this.props.onClick) {
          this.props.onClick(value);
        }
      }}>
      {label}
    </div>;
  }
}));

module.exports = ListItem;
