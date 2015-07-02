import React from 'react'
import ListItem from './ListItem'
import has from 'lodash/object/has'
import Radium, {PropTypes} from 'radium'
import pureRender from 'pure-render-decorator'
import MatterBasics from '../utils/MatterBasics'

@Radium
@MatterBasics
export default class List extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.oneOf([
      PropTypes.string,
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        key: PropTypes.string,
      })
    ])).isRequired
  }

  constructor(props) {
    super(props)
  }

  handleClickItem(item) {
    if (item.onClick) {
      item.onClick(item)
    }

    var {onSelect} = this.this.props
    if (onSelect) {
      onSelect(item)
    }
  }

  render() {
    var {mod, style, items} = this.props

    var children = items.map((item, idx) => {
      if (typeof item === 'string') {
          item = {label: item}
      }

      return <ListItem
        {...item}
        onClick = {() => this.handleClickItem(item)}
        key={has(item, 'key') ? item.key : idx}/>
    })

    return <div
      {...this.getBasics()}
      style={this.getStyle('list', mod, style)}>

      {children}
    </div>
  }
}
