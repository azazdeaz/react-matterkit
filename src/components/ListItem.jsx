import React, {PropTypes} from 'react'
import assign from 'lodash/object/assign'
import Radium from 'radium'
import shouldPureComponentUpdate from 'react-pure-render/function'
import MatterBasics from '../utils/MatterBasics'
import Icon from './Icon'

@Radium
@MatterBasics
export default class ListItem extends React.Component {
  shouldComponentUpdate = shouldPureComponentUpdate
  static propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.any,
    selected: PropTypes.bool,
    onClick: PropTypes.func,
  }

  render() {
    const {mod, style, selected, label, icon, value, onClick} = this.props

    return <div
      title = {label}
      {...this.getBasics()}
      style={this.getStyle('listItem', {mod, ...selected}, style)}
      onClick={() => {
        if (onClick) {
          onClick(value)
        }
      }}>
      {icon
        ? <Icon icon={icon} style={{marginRight: 6}}/>
        : null
      }
      {label}
    </div>
  }
}
