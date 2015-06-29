import React from 'react'
import Radium from 'radium'
import assign from 'lodash/object/assign'
import has from 'lodash/object/has'
import MatterBasics from '../utils/MatterBasics'

@Radium
@MatterBasics
export default class Toolbar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    var {mod, style} = this.props

    mod = assign({}, mod)
    if(!has(mod, 'size')) {
      mod.size = this.getStyle('config').lineHeight
    }

    return <div
      {...this.getBasics()}
      style={this.getStyle('toolbarGroup', mod, style)}>
      {this.props.children}
    </div>
  }
}
