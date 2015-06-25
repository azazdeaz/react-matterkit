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
      currTypeIdx: this.getCurrTypeIdx(),
    }
  }

  componentWillReceiveProps(nextProps) {

    this.setState({currTypeIdx: this.getCurrTypeIdx(nextProps)})
  }

  getCurrTypeIdx(props) {

    props = props || this.props

    var {typeIdx, chooseType, value} = props
    return chooseType ? chooseType(value) : typeIdx
  }

  handleAddonClick = () => {
    var {types} = this.props
    var {currTypeIdx} = this.state
    currTypeIdx = (currTypeIdx + 1) % types.length
    this.setState({currTypeIdx})
  }

  handleChange = (value) => {

    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  render() {

    return <Input
      {...this.getBasics()}
      {...this.props}
      {...this.props.types[this.state.currTypeIdx]}
      onChange = {this.handleChange}
      onInitialFormat = {this.handleChange}
      addonOnClick = {this.handleAddonClick}/>
  }
}
