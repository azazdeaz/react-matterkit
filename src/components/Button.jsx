var React = require('react/addons');
var {PureRenderMixin} = React;
var Radium = require('radium');
var assign = require('lodash/object/assign');
var Icon = require('./Icon');
var BasicMixin = require('../utils/BasicMixin');

var Button = React.createClass(Radium.wrap({

  mixins: [BasicMixin],

  propTypes: {
    label: React.PropTypes.string,
    disabled: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      label: '',
      disabled: false,
      mod: {
        kind: 'normal',
      }
    };
  },

  getInitialState() {
    return {
      toggled: false,
    };
  },

  render() {

    var {mod, style, icon, onClick, label, disabled} = this.props;

    mod = assign({disabled}, mod);

    if (icon) {
      icon = <Icon icon={this.props.icon}
        style={{marginRight:this.props.text ? 4 : 0}}/>;
    }

    return <div
      {...this.getBasics()}
      style={this.getStyle('button', mod, style)}
      onClick={onClick}>

      {icon}
      {label}
    </div>;
  }
}));

module.exports = Button;
