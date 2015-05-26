import React from 'react';
import _isFinite from 'lodash/lang/isFinite';
import Icon from './Icon';
import List from './List';
import CustomDrag from '../utils/CustomDrag';
import fuzzy from 'fuzzy';
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

    this.handleValue(props.value);
  }

  componentDidMount() {

    var deTarget = React.findDOMNode(this);

    this._customDrag = new CustomDrag({
      deTarget,
      onDown: () => {

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

          let node = React.findDOMNode(this.refs.input);
          node.focus();
          node.select();
        }
      }
    });
  }

  componentWillReceiveProps(nextProps) {

    this.handleValue(nextProps.value, nextProps);
  }

  componentDidUpdate(prevProps, prevState) {

    var {exportValue} = this.state;

    if (exportValue !== prevState.exportValue &&
      exportValue !== this.props.value &&
      this.props.onChange) {

      this.props.onChange(exportValue);
    }
  }

  handleValue(value, props) {

    props = props || this.props;

    value = this._formatValue(value, props);

    var {prepareExportValue} = props;
    var exportValue = prepareExportValue ? prepareExportValue(value) : value;

    this.setState({value, exportValue});

    this._validate(value);
  }

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
  }

  _formatNumber(value) {

    var min = this.props.min,
      max = this.props.max,
      precision = this.props.precision;

    value = parseFloat(value);

    if (_isFinite(min)) value = Math.max(min, value);
    if (_isFinite(max)) value = Math.min(max, value);

    value = parseFloat(value.toFixed(precision));

    return _isFinite(value) ? value : 0;
  }

  _validate(value) {

    if (typeof(this.props.validate) === 'function') {

      this.setState({error: !this.props.validate(value)});
    }
  }

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
  }

  render() {
    var {mod, style} = this.props;

    return <div
      style = {this.getStyle('input', mod, style)}
      onMouseDown = {e=>{
        var inputNode = React.findDOMNode(this.refs.input);
        if (inputNode.ownerDocument.activeElement === inputNode &&
          e.target !== inputNode)
        {
          e.stopPropagation();
          e.preventDefault();
        }
      }}>

      <input
        ref='input'
        {...this.getBasics()}
        style = {this.getStyle('inputResetCss', mod)}
        palceholder = {this.props.palceholder}
        value = {this.state.value}
        type = 'text'
        name = {this.props.name}
        pattern = {this.props.pattern}
        onChange = {e => this.handleValue(e.target.value)}
        disabled = {this.props.disabled}/>

      <Addon
        mod={this.props.mod}
        icon={this.props.addonIcon}
        label={this.props.addonLabel}
        background={this.props.addonBackground}
        onClick={this.props.addonOnClick}/>

      {this.renderHints()}
    </div>;
  }
}



@Radium.Enhancer
@pureRender
@MatterBasics
class Addon extends React.Component {

  render() {

    var {label, icon, mod, onClick} = this.props;

    if (!label && !icon) {
      return <div hidden={true}/>;
    }

    var icon = icon ? <Icon icon={icon}/> : undefined;

    return <span
      {...this.getBasics()}
      style = {this.getStyle('inputAddon', mod)}
      onClick = {onClick}>

      {label}
      {icon}
    </span>;
  }
}
