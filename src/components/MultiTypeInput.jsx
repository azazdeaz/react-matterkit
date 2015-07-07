import React from 'react'
import Input from './Input'
import Radium from 'radium'
import pureRender from 'pure-render-decorator'
import MatterBasics from '../utils/MatterBasics'

@Radium
@pureRender
@MatterBasics
export default class MultiTypeInput extends React.Component {
  static propTypes = {
  }

  static defaultProps = {
    types: [],
    typeIdx: 0,
  }

  constructor(props) {
    super(props)

    this.state = {
      currentTypeIdx: this.getcurrentTypeIdx(),
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({currentTypeIdx: this.getcurrentTypeIdx(nextProps)})
  }

  getcurrentTypeIdx(props) {
    props = props || this.props

    var {typeIdx, chooseType, value} = props
    return chooseType ? chooseType(value) : typeIdx
  }

  handleAddonClick = () => {
    var {types} = this.props
    var {currentTypeIdx} = this.state
    currentTypeIdx = (currentTypeIdx + 1) % types.length
    this.setState({currentTypeIdx})
  }

  handleChange = (value) => {
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  render() {
    var {currentTypeIdx} = this.state

    return <Input
      {...this.getBasics()}
      {...this.props}
      {...this.props.types[currentTypeIdx]}
      onChange = {this.handleChange}
      onInitialFormat = {this.handleChange}
      addonOnClick = {this.handleAddonClick}/>
  }
}
