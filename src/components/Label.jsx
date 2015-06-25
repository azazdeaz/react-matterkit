import React from 'react'
import Radium from 'radium'
import pureRender from 'pure-render-decorator'
import MatterBasics from '../utils/MatterBasics'

@Radium
@pureRender
@MatterBasics
export default class Label extends React.Component {
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
