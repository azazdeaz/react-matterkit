import React from 'react'
import Input from './Input'
import Radium from 'radium'
import shouldPureComponentUpdate from 'react-pure-render/function'
import MatterBasics from '../utils/MatterBasics'
import findIndex from 'lodash/array/findIndex'

@Radium
@MatterBasics
export default class MultiTypeInput extends React.Component {
  static propTypes = {
  }

  static defaultProps = {
    types: []
  }

  constructor(props) {
    super(props)
    this.state = {
      currentTypeIndex: 0,
    }
    this.state.currentTypeIndex = this.getCurrentTypeIndex()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({currentTypeIndex: this.getCurrentTypeIndex(nextProps)})
  }

  getCurrentTypeIndex(props) {
    props = props || this.props

    var {types, value} = props
    var {currentTypeIndex} = this.state

    function isAccept(type) {
      return !type.acceptValue || type.acceptValue(value)
    }

    if (isAccept(types[currentTypeIndex])) {
      return currentTypeIndex
    }

    var nextTypeIdx = findIndex(types, type => isAccept(type))

    if (nextTypeIdx === -1) {
      nextTypeIdx = currentTypeIndex
    }

    return nextTypeIdx
  }

  handleAddonClick = () => {
    var {types} = this.props
    var {currentTypeIndex} = this.state
    currentTypeIndex = (currentTypeIndex + 1) % types.length
    this.setState({currentTypeIndex})
  }

  handleChange = (value) => {
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  render() {
    var {currentTypeIndex} = this.state

    return <Input
      {...this.getBasics()}
      {...this.props}
      {...this.props.types[currentTypeIndex]}
      onChange = {this.handleChange}
      onInitialFormat = {this.handleChange}
      addonOnClick = {this.handleAddonClick}/>
  }
}
