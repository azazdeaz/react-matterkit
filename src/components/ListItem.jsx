import React, {PropTypes} from 'react'
import assign from 'lodash/object/assign'
import Radium from 'radium'
import pureRender from 'pure-render-decorator'
import MatterBasics from '../utils/MatterBasics'

@Radium
@pureRender
@MatterBasics
export default class ListItem extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.any,
    selected: PropTypes.bool,
    onClick: PropTypes.func,
  }

  render() {
    let {mod, style, selected, label, value, onClick} = this.props

    return <div
      {...this.getBasics()}
      style={this.getStyle('listItem', {mod, ...selected}, style)}
      onClick={() => {
        if (onClick) {
          onClick(value)
        }
      }}>
      {label}
    </div>
  }
}
