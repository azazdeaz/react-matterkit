import React from 'react';
import _isFinite from 'lodash/lang/isFinite';
import Icon from './Icon';
import List from './List';
import CustomDrag from '../utils/CustomDrag';
import fuzzy from 'fuzzy';
import Radium from 'radium';
import pureRender from 'pure-render-decorator';
import MatterBasics from '../utils/MatterBasics';

@Radium
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
    this.editValue(this.props.value);
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
          value: this.state.draftValue,
        };
      },
      onDrag: (md) => {
        var value = md.value + md.dx * this.props.dragSpeed;
        this.editValue(value);
      },
      onClick: (md) => {
        let node = React.findDOMNode(this.refs.input);
        node.focus();
        node.select();
      },
      onUp: (md) => {
        let node = React.findDOMNode(this.refs.input);
        node.focus();
        // node.select();
      }
    });
  }

  componentWillReceiveProps(nextProps) {

    this.editValue(nextProps.value, nextProps);
  }

  componentDidUpdate(prevProps, prevState) {

    var {exportValue} = this.state;

    if (exportValue !== prevState.exportValue &&
      exportValue !== this.props.value &&
      this.props.onChange) {

      this.props.onChange(exportValue);
    }
  }

  editValue(draftValue, props) {

    props = props || this.props;

    var value = this.formatValue(draftValue, props);

    var {prepareExportValue} = props;
    var exportValue = prepareExportValue ? prepareExportValue(value) : value;

    this.setState({value, exportValue, draftValue});

    this._validate(value);
  }

  formatValue(value, props) {

    props = props || this.props;

    if (props.type === 'number') {
      value =  this.formatNumber(value);
    }
    else if (props.type === 'text') {
      value += '';
    }

    if (props.formatValue) {
      value = props.formatValue(value);
    }

    return value;
  }

  formatNumber(value) {

    var {min, max, precision} = this.props;

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


  handleMouseDown = (e) => {
    //prevent to toolse focus by clicking on a child
    var inputNode = React.findDOMNode(this.refs.input);
    if (inputNode.ownerDocument.activeElement === inputNode &&
      e.target !== inputNode)
    {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  handleFocus = () => {
    this.setState({focus: true});
  }

  handleBlur = () => {
    this.setState({
      focus: false,
      draftValue: this.state.value,
    });

  }

  render() {
    var {mod, style} = this.props;

    return <div
      style = {this.getStyle('input', mod, style)}
      onMouseDown = {this.handleMouseDown}>

      <input
        ref='input'
        {...this.getBasics()}
        style = {this.getStyle('inputField', mod)}
        palceholder = {this.props.palceholder}
        value = {this.state.draftValue}
        type = 'text'
        name = {this.props.name}
        pattern = {this.props.pattern}
        onFocus = {this.handleFocus}
        onBlur = {this.handleBlur}
        onChange = {e => this.editValue(e.target.value)}
        disabled = {this.props.disabled}/>

      <Addon
        mod = {this.props.mod}
        icon = {this.props.addonIcon}
        label = {this.props.addonLabel}
        background = {this.props.addonBackground}
        onClick = {this.props.addonOnClick}/>

      {this.renderHints()}
    </div>;
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
          this.editValue(value);
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
}



@Radium
@pureRender
@MatterBasics
class Addon extends React.Component {

  render() {
    var {label, icon, mod, onClick} = this.props;

    if (!label && !icon) {
      return <div hidden={true}/>;
    }

    icon = icon ? <Icon icon={icon}/> : undefined;

    return <span
      {...this.getBasics()}
      style = {this.getStyle('inputAddon', mod)}
      onClick = {onClick}>

      {label}
      {icon}
    </span>;
  }
}
