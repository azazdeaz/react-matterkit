import React from 'react'
import Radium from 'radium'
import assign from 'lodash/object/assign'
import MatterBasics from '../utils/MatterBasics'

@Radium
@MatterBasics
export default class Toolbar extends React.Component {
  static defaultProps = {
    direction: 'row'
  }

  constructor(props) {
    super(props)
  }

  render() {
    var {mod, style, direction, size} = this.props

    mod = assign({direction, size}, mod)

    return <div
      {...this.getBasics()}
      style={this.getStyle('toolbar', mod, style)}
      onClick={this.props.onClick}>
      {this.props.children}
    </div>
  }
}
