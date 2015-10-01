import React from 'react'
import ListItem from './ListItem'
import has from 'lodash/object/has'
import Radium from 'radium'
import pureRender from 'pure-render-decorator'
import MatterBasics from '../utils/MatterBasics'

@Radium
@MatterBasics
export default class List extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    var {mod, style, items} = this.props
    var children

    if (items) {
      children = items.map((item, idx) => {
        if (typeof(item) === 'string') {
          item = {label: item}
        }

        return <ListItem
          {...item}
          key={has(item, 'key') ? item.key : idx}/>
      })
    }
    else {
      children = React.Children.map(this.props.children, (child, idx) => {
        if (has(child.props, 'key')) {
          return child
        }
        else {
          return React.addons.cloneWithProps(child, {key: idx})
        }
      })
    }

    return <div
      {...this.getBasics()}
      style={this.getStyle('list', mod, style)}>

      {children}
    </div>
  }
}
