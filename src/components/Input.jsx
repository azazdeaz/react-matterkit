var React = require('react/addons');
var { PureRenderMixin } = React;
var { StyleResolverMixin, BrowserStateMixin } = require('radium');
var merge = require('lodash/object/merge');
var has = require('lodash/object/has');
var style = require('./style');
var Icon = require('./Icon');

var Input = React.createClass({

  mixins: [ StyleResolverMixin, BrowserStateMixin ],

  getDefaultProps() {
    return {
      disabled: false,
    };
  },
  getInitialState() {
    return {
      value: this.props.value,
      error: false,
    };
  },
  componentWillReciveProps(nextProps) {

    if(has(nextProps, 'value')) {

      this.setState({value: nextProps.value});
    }
  },
  componentWillMount() {
console.log('componentWillMount', this.state.value)
    this._validate(this.state.value);
  },
  _onChange(e) {

    var value = e.target.value;

    this.setState({value});

    this._validate(value);

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  },

  _validate(value) {

    if (typeof(this.props.validate) === 'function') {

      this.setState({error: !this.props.validate(value)});
    }
  },
  // render: function () {
  //
  //   var addonStyle = {
  //     height: '100%',
  //     position: 'absolute',
  //     right: 0,
  //     padding: '0 5px',
  //     backgroundColor: style.grey.normal,
  //     borderRadiusTopLeft: style.borderRadius,
  //     borderRadiusBottomLeft: style.borderRadius,
  //   };
  //
  //   var childCount = React.Children.count(this.props.children);
  //   var addons;
  //   if (false) {
  //
  //   addon = <span contentEditable={false} style={addonStyle}>
  //     add
  //   </span>;
  //   }
  //
  //   var addStyle=merge({
  //     position:'relative',
  //     minWidth: 170,
  //     whiteSpace:'nowarp',
  //     overflow:'hidden'}, style.input);
  //
  //   return <div
  //     contentEditable = {true}
  //     tabindex = {0}
  //     {...this.getBrowserStateEvents()}
  //     style = {this.buildStyles(addStyle, {disabled: this.props.disabled})}
  //     value = {this.props.value}
  //     palceholder = {this.props.palceholder}
  //     type = {this.props.type}
  //     onChange = {this._onChange}
  //     disabled = {this.props.disabled}>
  //
  //     {this.props.value}
  //   </div>;
  // },
  render: function () {

    return <div
      style = {this.buildStyles(style.input, {disabled: this.props.disabled})}>

      <input
        {...this.getBrowserStateEvents()}
        style = {style.inputReset}
        value = {this.state.value}
        palceholder = {this.props.palceholder}
        type = {this.props.type}
        onChange = {this._onChange}
        disabled = {this.props.disabled}/>

      <Addon
        icon={this.props.addonIcon}
        label={this.props.addonLabel}
        onClick={this.props.addonOnClick}/>

    </div>;
  }
});

var Addon = React.createClass({

  mixins: [ StyleResolverMixin, BrowserStateMixin ],

  render() {

    if (!this.props.label && !this.props.icon) {
      return <div hidden={true}/>;
    }

    var icon = this.props.icon ? <Icon icon={this.props.icon}/> : undefined;

    return <span
      {...this.getBrowserStateEvents()}
      style = {this.buildStyles(style.inputAddon)}
      onClick={this.props.onClick}>

      {this.props.label}
      {icon}

    </span>;
  },
});

module.exports = Input;
