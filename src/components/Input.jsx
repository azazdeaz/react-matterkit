import React from 'react'
import _isFinite from 'lodash/lang/isFinite'
import Icon from './Icon'
import List from './List'
import customDrag from '../custom-drag'
import fuzzy from 'fuzzy'
import Radium from 'radium'
import pureRender from 'pure-render-decorator'
import MatterBasics from '../utils/MatterBasics'

const dragOptions = {
  onDown: (props, monitor, component) => {
    // monitor.getLastEvent().stopPropagation()
    if (!component.isDraggable()) {
      return false
    }

    monitor.setData({
      onDown: component.state.formattedValue,
    })
  },
  onDrag: (props, monitor, component) => {
    var {onDownValue} = monitor.getData()
    var {x} = monitor.getDifferenceFromInitialOffset()
    var value = onDownValue + (x * props.dragSpeed)
    component.editValue(value)
  },
  onClick: (ptops, monitor, component) => {
    let node = React.findDOMNode(component).querySelector('input')
    node.focus()
    node.select()
  }
}

@customDrag(dragOptions)
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
    prepareExportValue: undefined,
    formatValue: undefined,
  }

  constructor(props) {
    super(props)

    this.state = {
      value: undefined,
      error: false,
    }
  }

  componentWillMount() {
    this.setPropsValue(this.props)
  }

  // componentDidMount() {
  //   var deTarget = React.findDOMNode(this.refs.input)
  //
  //   this._customDrag = new CustomDrag({
  //     deTarget,
  //     onDown: (e) => {
  //       // let node = React.findDOMNode(this.refs.input)
  //       // node.focus()
  //       if (!this.isDraggable()) {
  //         return false
  //       }
  //
  //       e.stopPropagation()
  //
  //       return {
  //         value: this.state.formattedValue,
  //       }
  //     },
  //     onDrag: (md) => {
  //       var value = md.value + md.dx * this.props.dragSpeed
  //       this.editValue(value)
  //     },
  //     onClick: (md) => {
  //       let node = React.findDOMNode(this.refs.input)
  //       node.focus()
  //       node.select()
  //     },
  //     onUp: (md) => {
  //       // let node = React.findDOMNode(this.refs.input)
  //       // node.focus()
  //       // node.select()
  //     }
  //   })
  // }

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

    var formattedValue = this.formatValue(value, props)

    var {prepareExportValue} = props
    var exportValue = prepareExportValue ?
      prepareExportValue(formattedValue) : formattedValue

    this.setState({formattedValue, exportValue})

    this.validate(formattedValue)
  }

  formatValue(value, props) {
    props = props || this.props

    if (props.type === 'number') {
      value = this.formatNumber(value)
    }
    else if (props.type === 'text') {
      value += ''
    }

    if (props.formatValue) {
      value = props.formatValue(value)
    }

    return value
  }

  formatNumber(value) {
    var {min, max, precision} = this.props

    value = parseFloat(value)

    if (_isFinite(min)) value = Math.max(min, value)
    if (_isFinite(max)) value = Math.min(max, value)

    value = parseFloat(value.toFixed(precision))

    return _isFinite(value) ? value : 0
  }

  validate(value) {
    if (typeof this.props.validate === 'function') {
      this.setState({error: !this.props.validate(value)})
    }
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
  }

  handleBlur = () => {
    this.editValue(this.state.inputValue)

    this.setState({
      focus: false
    })
  }

  renderHints() {
    var {value, lastlySelectedHint, focus} = this.state

    if (!focus || value === lastlySelectedHint || !value || !this.props.hints) {
      return null
    }

    var hints = fuzzy.filter(value, this.props.hints, {
      pre: '<strong>',
      post: '</strong>',
    })

    hints.splice(12)

    hints = hints.map(hint => {
      return {
        label: <span dangerouslySetInnerHTML={{__html: hint.string}}/>,
        onClick: () => {

          var value = hint.original
          this.setState({lastlySelectedHint: value})
          this.editValue(value)
        },
      }
    })

    if (hints.length === 0) {
      return null
    }
    return <List items={hints} style={{
      position: 'absolute',
      zIndex: 1,
      top: '100%',
      left: 0,
      width: '100%',
    }}/>
  }

  render() {
    var {mod, style, pattern, placeholder, disabled, draggerRef} = this.props
    var {focus, inputValue, formattedValue} = this.state
    var draggable = this.isDraggable()

    return <div
      style = {this.getStyle('input', mod, style)}
      onMouseDown = {this.handleMouseDown}>

      <input
        ref = {draggerRef}
        {...this.getBasics()}
        style = {this.getStyle('inputField', {draggable, ...mod})}
        palceholder = {placeholder}
        value = {focus ? inputValue : formattedValue}
        type = 'text'
        name = {this.props.name}
        pattern = {pattern}
        onFocus = {this.handleFocus}
        onBlur = {this.handleBlur}
        onChange = {this.handleChange}
        disabled = {disabled}/>

      <Addon
        mod = {this.props.mod}
        icon = {this.props.addonIcon}
        label = {this.props.addonLabel}
        background = {this.props.addonBackground}
        onClick = {this.props.addonOnClick}/>

      {this.renderHints()}
    </div>
  }
}



@Radium
@pureRender
@MatterBasics
class Addon extends React.Component {
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
