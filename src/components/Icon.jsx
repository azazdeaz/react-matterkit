import React, {PropTypes} from 'react'
import Radium from 'radium'
import shouldPureComponentUpdate from 'react-pure-render/function'
import MatterBasics from '../utils/MatterBasics'

@Radium
@MatterBasics
export default class Icon extends React.Component {
  shouldComponentUpdate = shouldPureComponentUpdate
  static propTypes = {
    icon: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    style: PropTypes.object,
  }

  constructor(props) {
    super(props)
  }

  render() {
    var {mod, style} = this.props

    return <i
      {...this.getBasics()}
      style = {this.getStyle('icon', mod, style)}
      className = {this.props.className || `fa fa-${this.props.icon}`}
      onClick = {this.props.onClick}/>
  }
}
