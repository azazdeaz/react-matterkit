import React from 'react';
var { PureRenderMixin } = React;

import merge from 'lodash/object/merge';
import has from 'lodash/object/has';
import _isFinite from 'lodash/lang/isFinite';
import isArray from 'lodash/lang/isArray';
import style from './style';
import Icon from './Icon';
import List from './List';
import CustomDrag from '../utils/CustomDrag';
import fuzzy from 'fuzzy';
import BasicMixin from '../utils/BasicMixin';
import Radium from 'radium';
import pureRender from 'pure-render-decorator';
import MatterBasics from '../utils/MatterBasics';

@Radium.Enhancer
@pureRender
@MatterBasics
export default class Input extends React.Component {

  static propTypes = {
  }

  static defaultProps = {
    disabled: false,
    draggable: true,
    precision: 12,
    dragSpeed: 1,
    value: '',
    type: 'text',
    min: undefined,
    max: undefined,
    hints: undefined,
    maxVisibleHints: 12,
  }

  constructor(props) {
    super(props);

    this.state = {
      value: undefined,
      error: false,
    };
  }

  componentWillMount() {
    this.handleValue(this.props.value);
  },

  componentDidMount() {

    new CustomDrag({
      deTarget: this.getDOMNode(),
      onDown: (e) => {

        if (this.props.type !== 'number' || !this.props.draggable) {

          return false;
        }

        return {
          value: this.state.value,
          moved: false,
        };
      },
      onDrag: (md) => {
        md.moved = true;

        var value = md.value + md.dx * this.props.dragSpeed;
        this.handleValue(value);
      },
      onUp: (md) => {
        if (!md.moved) {

          let node = this.refs.input.getDOMNode();
          node.focus();
          node.select();
        }
      }
    });
  },

  componentWillReceiveProps(nextProps) {

    this.handleValue(nextProps.value, nextProps);
  },

  componentDidUpdate(prevProps, prevState) {

    var {exportValue} = this.state;

    if (exportValue !== prevState.exportValue &&
      exportValue !== this.props.value &&
      this.props.onChange) {

      this.props.onChange(exportValue);
    }
  },

  handleValue(value, props) {

    props = props || this.props;

    value = this._formatValue(value, props);

    var {prepareExportValue} = props;
    var exportValue = prepareExportValue ? prepareExportValue(value) : value;

    this.setState({value, exportValue});

    this._validate(value);
  },

  _formatValue(value, props) {

    props = props || this.props;

    if (props.type === 'number') {
      value =  this._formatNumber(value);
    }
    else if (props.type === 'text') {
      value += '';
    }

    if (props.formatValue) {
      value = props.formatValue(value);
    }

    return value;
  },

  _formatNumber(value) {

    var min = this.props.min,
      max = this.props.max,
      precision = this.props.precision;

    value = parseFloat(value);

    if (_isFinite(min)) value = Math.max(min, value);
    if (_isFinite(max)) value = Math.min(max, value);

    value = parseFloat(value.toFixed(precision));

    return _isFinite(value) ? value : 0;
  },

  _validate(value) {

    if (typeof(this.props.validate) === 'function') {

      this.setState({error: !this.props.validate(value)});
    }
  },

  renderHints() {

    var {value, lastlySelectedHint, focus} = this.state;

    if (!focus || value === lastlySelectedHint || !value || !this.props.hints) {
      return null;
    }

    var hints = fuzzy.filter(value, this.props.hints, {
      pre: '<strong>',
      post:'</strong>',
    });

    hints.splice(12);

    hints = hints.map(hint => {
      return {
        label: <span dangerouslySetInnerHTML={{__html: hint.string}}/>,
        onClick: () => {

          var value = hint.original;
          this.setState({lastlySelectedHint: value});
          this.handleValue(value);
        },
      };
    });

    if (hints.length === 0) {
      return null;
    }
    return <List items={hints} style={{
      position: 'absolute',
      zIndex: 1,
      top: '100%',
      left: 0,
      width: '100%',
    }}/>;
  },

  render: function () {

    return <div
      onMouseDown = {e=>{
        var inputNode = this.refs.input.getDOMNode();
        if (inputNode.ownerDocument.activeElement === inputNode &&
          e.target !== inputNode)
        {
          e.stopPropagation();
          e.preventDefault();
        }
      }}
      style = {this.buildStyles(style.input)}>

      <input
        ref='input'
        {...this.getBasics()}
        {...this.getBrowserStateEvents()}
        style = {style.inputReset}
        palceholder = {this.props.palceholder}
        value = {this.state.value}
        type = 'text'
        name = {this.props.name}
        pattern = {this.props.pattern}
        onChange = {e => this.handleValue(e.target.value)}
        disabled = {this.props.disabled}/>

      <Addon
        icon={this.props.addonIcon}
        label={this.props.addonLabel}
        background={this.props.addonBackground}
        onClick={this.props.addonOnClick}/>


      {this.renderHints()}
    </div>;
  }
});




export default class Addon extends React.Component {

  render() {

    if (!this.props.label && !this.props.icon) {
      return <div hidden={true}/>;
    }

    var icon = this.props.icon ? <Icon icon={this.props.icon}/> : undefined;

    var s = this.buildStyles(style.inputAddon);

    return <span
      {...this.getBrowserStateEvents()}
      style = {s}
      onClick = {this.props.onClick}>

      {this.props.label}
      {icon}

    </span>;
  },
});

module.exports = Input;
