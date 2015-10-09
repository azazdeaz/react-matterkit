import React, {PropTypes} from 'react'
import assign from 'lodash/object/assign'
import Icon from './Icon'
import Radium from 'radium'
import shouldPureComponentUpdate from 'react-pure-render/function'
import MatterBasics from '../utils/MatterBasics'
import TooltipHOC from './TooltipHOC'

@TooltipHOC
@Radium
@MatterBasics
export default class Button extends React.Component {
  shouldComponentUpdate = shouldPureComponentUpdate
  static propTypes = {
    label: PropTypes.string,
    icon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape(Icon.propTypes)
    ]),
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

    mod = {...mod, disabled, onlyIcon: icon && !label}

    if (typeof icon === 'string') {
      icon = {icon}
    }

    if (icon) {
      let iconStyle = {...icon.style, marginRight: label ? 4 : 0}
      icon = <Icon {...icon} style={iconStyle}/>
    }

    return <div
      {...this.getBasics()}
      style = {this.getStyle('button', mod, style)}
      onClick = {onClick}>

      {icon}
      {label}
    </div>
  }
}
