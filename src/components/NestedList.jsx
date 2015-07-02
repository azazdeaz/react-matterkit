import React from 'react'
import ListItem from './ListItem'
import last from 'lodash/array/last'
import find from 'lodash/collection/find'
import Radium, {PropTypes} from 'radium'
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
        children: PropTypes.array
      })
    ])).isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      path: []
    }
  }

  handleSelectItem = (item) => {
    if (item.children) {
      var nextPath = this.state.path.concat([item.label])
      this.setState({path: nextPath})
    }
  }

  handleLevelUp = () => {
    var nextPath = this.state.path.slice(0, -1)
    this.setState({path: nextPath})
  }

  render() {
    var {mod, style, items} = this.props
    var {path} = this.state

    if (path.length !== 0) {
      path.forEach(label => {
        var parent = find(items, {label})
        items = parent.children
      })

      items = [{
        label: '<' + last(path).label,
        onClick: this.handleLevelUp
      }].concat(items)
    }

    return <List
      style = {style}
      mod = {mod}
      items = {items}
      onSelect = {this.handleSelectItem}/>
  }
}
