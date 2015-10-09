import React from 'react'
import Radium from 'radium'
import shouldPureComponentUpdate from 'react-pure-render/function'
import MatterBasics from '../utils/MatterBasics'

@Radium
@MatterBasics
export default class Label extends React.Component {
  shouldComponentUpdate = shouldPureComponentUpdate
  constructor(props) {
    super(props)
  }

  render() {
    var {mod, style, label, children} = this.props

    if (label === undefined) {
      label = children
    }

    return <span
      {...this.getBasics()}
      style={this.getStyle('label', mod, style)}>

      {label}
    </span>
  }
}
