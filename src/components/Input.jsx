var React = require('react/addons');
var { PureRenderMixin } = React;
var { StyleResolverMixin, BrowserStateMixin } = require('radium');
var merge = require('lodash/object/merge');
var has = require('lodash/object/has');
var _isFinite = require('lodash/lang/isFinite');
var style = require('./style');
var Icon = require('./Icon');
var CustomDrag = require('../utils/CustomDrag');

var Input = React.createClass({

  mixins: [ StyleResolverMixin, BrowserStateMixin ],

  getDefaultProps() {
    return {
      disabled: false,
      draggable: true,
      precision: 0,
      dragSpeed: 1,
      defaultValue: 0,
      min: undefined,
      max: undefined,
    };
  },

  getInitialState() {
    return {
      value: this.props.value,
      error: false,
    };
  },

  componentWillMount() {
    this._validate(this.state.value);
  },

  componentDidMount() {

    new CustomDrag({
      deTarget: this.getDOMNode(),
      onDown: (e) => {

        if (this.props.type !== 'number' || !this.props.draggable) {

          return false;
        }

        return {
          value: this.props.value,
          moved: false,
        };
      },
      onDrag: (md) => {

        md.moved = true;

        var value = md.value + md.dx * this.props.dragSpeed;
        this._onChange(value);
      },
      onUp: (md) => {
        if (!md.moved) this.getDOMNode().focus();
      }
    });
  },

  componentWillReciveProps(nextProps) {

    if(has(nextProps, 'value')) {

      this.setState({value: nextProps.value});
    }
  },

  _onChange(value) {

    if (this.props.type === 'number') {

      value = this._formatNumber(value);
    }

    this.setState({value});

    this._validate(value);

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  },

  _formatNumber(value) {

    var min = this.props.min,
      max = this.props.max,
      precision = this.props.precision;

    if (_isFinite(min)) value = Math.max(min, value);
    if (_isFinite(max)) value = Math.min(max, value);

    value = parseFloat(value.toFixed(precision));

    return value;
  },

  _validate(value) {

    if (typeof(this.props.validate) === 'function') {

      this.setState({error: !this.props.validate(value)});
    }
  },

  render: function () {

    var type = this.props.type;

    if (type === 'number') type = 'tel';

    return <div
      style = {this.buildStyles(style.input, {disabled: this.props.disabled})}>

      <input
        {...this.getBrowserStateEvents()}
        style = {style.inputReset}
        value = {this.state.value}
        palceholder = {this.props.palceholder}
        type = {type}
        name = {this.props.name}
        pattern = {this.props.pattern}
        onChange = {e => this._onChange(e.target.value)}
        disabled = {this.props.disabled}/>

      <Addon
        icon={this.props.addonIcon}
        label={this.props.addonLabel}
        background={this.props.addonBackground}
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
