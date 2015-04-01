var React = require('react');
var { StyleResolverMixin, BrowserStateMixin } = require('radium');
var merge = require('lodash/object/merge');
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
  _onChange(e) {
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  },
  render: function () {

    var addonStyle = {
      height: '100%',
      position: 'absolute',
      right: 0,
      padding: '0 5px',
      backgroundColor: style.grey.normal,
      borderRadiusTopLeft: style.borderRadius,
      borderRadiusBottomLeft: style.borderRadius,
    };

    var childCount = React.Children.count(this.props.children);
    var addons = <span contentEditable={false} style={addonStyle}>
      add
    </span>;
    var addStyle=merge({
      position:'relative',
      minWidth: 170,
      whiteSpace:'nowarp',
      overflow:'hidden'}, style.input);

    return <div
      contentEditable = {true}
      tabindex = {0}
      {...this.getBrowserStateEvents()}
      style = {this.buildStyles(addStyle, {disabled: this.props.disabled})}
      value = {this.props.value}
      palceholder = {this.props.palceholder}
      type = {this.props.type}
      onChange = {this._onChange}
      disabled = {this.props.disabled}>

      fsdfsd
      {addons}
    </div>;
  }
});

module.exports = Input;
