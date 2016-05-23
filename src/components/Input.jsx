import React, {PropTypes} from 'react'
import ReactDOM from 'react-dom'
import _isFinite from 'lodash/lang/isFinite'
import Icon from './Icon'
import List from './List'
import Panel from './Panel'
import customDrag from 'custom-drag'
import fuzzy from 'fuzzy'
import Radium from 'radium'
import shouldPureComponentUpdate from 'react-pure-render/function'
import tinycolor from 'tinycolor2'
import MatterBasics from '../utils/MatterBasics'
import ColorCircle from '../utils/ColorCircle'

const dragOptions = {
  onDown: (props, monitor, component) => {
    // monitor.getLastEvent().stopPropagation()
    if (!component.isDraggable()) {
      return false
    }

    monitor.setData({
      onDownValue: component.state.formattedValue,
    })
  },
  onDrag: (props, monitor, component) => {
    var {onDownValue} = monitor.getData()
    var {x} = monitor.getDifferenceFromInitialOffset()
    var value = onDownValue + (x * props.dragSpeed)
    component.editValue(value)
  },
  onClick: (ptops, monitor, component) => {
    let node = ReactDOM.findDOMNode(component).querySelector('input')
    node.focus()
    node.select()
  }
}

@customDrag(dragOptions, connect => ({
  dragRef: connect.getDragRef()
}))
@Radium
@MatterBasics
export default class Input extends React.Component {
  shouldComponentUpdate = shouldPureComponentUpdate
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    type: PropTypes.oneOf(['string', 'number', 'color']),
  }

  static defaultProps = {
    disabled: false,
    draggable: true,
    precision: 12,
    dragSpeed: 1,
    value: '',
    type: 'string',
    min: undefined,
    max: undefined,
    prepareExportValue: undefined,
    formatValue: undefined,

    hints: undefined,
    maxVisibleHints: 12,
  }

  constructor(props) {
    super(props)

    this.state = {
      error: false,
    }
  }

  componentWillMount() {
    this.setPropsValue(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.setPropsValue(nextProps)
  }

  componentDidUpdate(prevProps, prevState) {
    var {exportValue, focus} = this.state

    if (
      !focus &&
      exportValue !== prevState.exportValue &&
      exportValue !== this.props.value &&
      this.props.onChange
    ) {
      this.props.onChange(exportValue)
    }

    if (this.props.forceFocus) {
      this.inputNode.focus()
    }

    if (
      this.props.onBlur
      && prevState.focus
      && !this.state.focus
    ) {
      this.props.onBlur()
    }
  }

  isDraggable() {
    return this.props.type === 'number' &&
           this.props.draggable &&
           !this.state.focus
  }

  setPropsValue(props) {
    if (!this.state.focus) {
      this.editValue(props.value, props)
    }
  }

  editValue(value, props) {
    props = props || this.props
    const {prepareExportValue} = props

    const formattedValue = this.formatValue(value, props)
    const prettifiedValue = this.prettifyValue(formattedValue, props)
    const exportValue = prepareExportValue ?
      prepareExportValue(formattedValue) : formattedValue

    this.setState({formattedValue, prettifiedValue, exportValue})

    this.validate(formattedValue)
  }

  formatValue(value, props) {
    props = props || this.props

    if (props.type === 'number') {
      value = this.formatNumber(value)
    }
    else if (props.type === 'string') {
      value += ''
    }

    if (props.formatValue) {
      value = props.formatValue(value)
    }

    return value
  }

  formatNumber(value) {
    var {min, max} = this.props

    value = parseFloat(value)
    if (_isFinite(min)) value = Math.max(min, value)
    if (_isFinite(max)) value = Math.min(max, value)

    return _isFinite(value) ? value : 0
  }

  prettifyValue(value, props) {
    props = props || this.props

    if (props.type === 'number') {
      value = this.prettifyNumber(value)
    }

    if (props.prettifyValue) {
      value = props.prettifyValue(value)
    }

    return value
  }

  prettifyNumber(value) {
    var {precision} = this.props
    value = parseFloat(value.toFixed(precision))
    return value
  }

  validate(value) {
    const {validate, type} = this.props
    if (typeof validate === 'function') {
      this.setState({error: !this.props.validate(value)})
    }
    else if (type === 'color') {
      this.setState({error: !tinycolor(value).isValid()})
    }
  }

  handleInputRef = (component) => {
    this.inputNode = ReactDOM.findDOMNode(component)
  }

  triggerBlur = () => {
    this.inputNode.blur()
  }

  handleChange = (e) => {
    this.setState({
      inputValue: e.target.value
    })
  }

  handleFocus = () => {
    this.setState({
      inputValue: this.state.formattedValue,
      focus: true
    })
    this.showDropdown()
  }

  handleBlur = () => {
    this.editValue(this.state.inputValue)

    this.setState({
      focus: false
    })
    this.hideDropdown()
  }

  handleKeyPress = (e) => {
    if (e.which === 13) {
      this.triggerBlur()
    }
  }

  forceShowDropdown() {
    this.setState({
      forceShowDropdown: true,
      showDropdown: true
    })
  }

  showDropdown() {
    this.setState({
      showDropdown: true
    })
  }

  hideDropdown() {
    this.setState({
      forceShowDropdown: false,
      showDropdown: false
    })
  }

  renderHints() {
    const {hints} = this.props
    const {inputValue, lastlySelectedHint, forceShowDropdown} = this.state

    if (
      !forceShowDropdown &&
      (inputValue === lastlySelectedHint || !inputValue || !hints)
    ) {
      return null
    }

    const selectedHints = fuzzy.filter(inputValue || '', hints, {
        pre: '<strong>',
        post: '</strong>',
      })
      .slice(0, 12)
      .map(hint => {
        return {
          label: <span dangerouslySetInnerHTML={{__html: hint.string}}/>,
          onClick: (e) => {
            var value = hint.original
            this.setState({
              inputValue: value,
              lastlySelectedHint: value
            }, this.triggerBlur)
            // this.editValue(value)
            this.hideDropdown()
          },
        }
      })

    if (selectedHints.length === 0) {
      return null
    }

    return <List items={selectedHints}/>
  }

  renderColorCircle() {
    const handleChange = hsl => {
      hsl = {...hsl, h: 360 * hsl.h}
      const color = tinycolor(this.state.inputValue)
      const format = color.getFormat()
      const alpha = color.getAlpha()
      const value = tinycolor(hsl).setAlpha(alpha).toString(format)
      this.setState({
        inputValue: value
      })
      this.editValue(value)
    }

    const inputColor = tinycolor(this.state.inputValue)
    const hsl = inputColor.isValid()
      ? inputColor.toHsl()
      : {h: 0, s: 0.5, l: 0.5}
    const radius = 234

    return <ColorCircle
      h = {hsl.h / 360}
      s = {hsl.s}
      l = {hsl.l}
      radius = {radius}
      width = {radius * 0.16}
      onChange = {handleChange}/>
  }

  renderDropdown() {
    if (!this.state.showDropdown) {
      return null
    }

    const {type} = this.props
    const content = type === 'string'
      ? this.renderHints()
      : type === 'color'
      ? this.renderColorCircle()
      : null

    if (!content) {
      return null
    }

    return <Panel
      style = {{
        position: 'absolute',
        zIndex: 1000,
        top: '100%',
        left: 0,
        width: '100%',
      }}
      onMouseDown = {e => {
        e.preventDefault()
        e.stopPropagation()
      }}>
      {content}
    </Panel>
  }

  renderAddon() {
    const {mod, addonIcon, addonLabel, addonBackground, addonOnClick} =
      this.props

    return <Addon
      mod = {mod}
      icon = {addonIcon}
      label = {addonLabel}
      background = {addonBackground}
      onClick = {
        addonOnClick === 'show-dropdown'
          ? () => this.forceShowDropdown()
          : addonOnClick
      }/>
  }

  render() {
    var {mod, style, pattern, placeholder, disabled, dragRef} = this.props
    var {focus, inputValue, prettifiedValue, error} = this.state
    var draggable = this.isDraggable()

    return <div
      style = {this.getStyle('input', {error, ...mod}, style)}
      onMouseDown = {this.handleMouseDown}>

      <input
        ref = {dragRef(this.handleInputRef)}
        {...this.getBasics()}
        style = {this.getStyle('inputField', {draggable, ...mod})}
        palceholder = {placeholder}
        value = {focus ? inputValue : prettifiedValue}
        type = 'text'
        name = {this.props.name}
        pattern = {pattern}
        onFocus = {this.handleFocus}
        onBlur = {this.handleBlur}
        onChange = {this.handleChange}
        onKeyPress = {this.handleKeyPress}
        disabled = {disabled}/>
      {this.renderAddon()}
      {this.renderDropdown()}
    </div>
  }
}



@Radium
@MatterBasics
class Addon extends React.Component {
  shouldComponentUpdate = shouldPureComponentUpdate
  render() {
    var {label, icon, mod, onClick} = this.props

    if (!label && !icon) {
      return <div hidden={true}/>
    }

    icon = icon ? <Icon icon={icon}/> : undefined

    return <span
      {...this.getBasics()}
      style = {this.getStyle('inputAddon', mod)}
      onClick = {onClick}>

      {label}
      {icon}
    </span>
  }
}
