import React from 'react'
import assign from 'lodash/object/assign'
import Radium, {PropTypes} from 'radium'
import pureRender from 'pure-render-decorator'
import MatterBasics from '../utils/MatterBasics'

@Radium
@pureRender
@MatterBasics
export default class ListItem extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.any,
  }

  constructor(props) {
    super(props)
  }

  render() {
    var {mod, style, selected, label, value, onClick} = this.props

    mod = assign({selected}, mod)

    return <div
      {...this.getBasics()}
      style={this.getStyle('listItem', mod, style)}
      onClick={() => {
        if (onClick) {
          onClick()
        }
      }}>
      {label}
    </div>
  }
}
