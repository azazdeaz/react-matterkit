import React from 'react'
import Radium from 'radium'
import pureRender from 'pure-render-decorator'
import MatterBasics from '../../utils/MatterBasics'

@Radium
@pureRender
@MatterBasics
export default class Accordion extends React.Component {

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
