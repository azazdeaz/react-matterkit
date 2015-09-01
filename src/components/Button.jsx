import React, {PropTypes} from 'react'
import assign from 'lodash/object/assign'
import Icon from './Icon'
import Radium from 'radium'
import pureRender from 'pure-render-decorator'
import MatterBasics from '../utils/MatterBasics'

@Radium
@pureRender
@MatterBasics
export default class Button extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    icon: Icon.propTypes,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    mod: PropTypes.shape({
      kind: PropTypes.oneOf(['normal', 'stamp', 'colored'])
    }),
    style: PropTypes.object
  }

  static defaultProps = {
    label: '',
    disabled: false,
    mod: {
      kind: 'normal',
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      toggled: false,
    }
  }

  render() {
    var {mod, style, icon, onClick, label, disabled} = this.props

    mod = {disabled, ...mod}

    if (typeof icon === 'string') {
      icon = {icon}
    }

    if (icon) {
      let iconStyle = {...icon.style, marginRight: label ? 4 : 0}
      icon = <Icon {...icon} style={iconStyle}/>
    }

    return <div
      {...this.getBasics()}
      style={this.getStyle('button', mod, style)}
      onClick={onClick}>

      {icon}
      {label}
    </div>
  }
}
