import React from 'react'
import Radium from 'radium'
import shouldPureComponentUpdate from 'react-pure-render/function'
import MatterBasics from '../../utils/MatterBasics'

@Radium
@MatterBasics
export default class Accordion extends React.Component {
  shouldComponentUpdate = shouldPureComponentUpdate

  constructor(props) {
    super(props)
  }

  onSelect(index) {
    console.log('select tab', index)
  }
  render() {
    var {mod, style} = this.props

    return <div style={style.accordion}>
      {this.props.children}
    </div>
  }
}
