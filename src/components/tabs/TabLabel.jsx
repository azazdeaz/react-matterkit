import React from 'react'
import Icon from '../Icon'
import Radium from 'radium'
import shouldPureComponentUpdate from 'react-pure-render/function'
import MatterBasics from '../../utils/MatterBasics'
import assign from 'lodash/object/assign'

@Radium
@MatterBasics
export default class TabLabel extends React.Component {
  shouldComponentUpdate = shouldPureComponentUpdate
  static propTypes = {
  }

  static defaultProps = {
    selected: false,
  }

  constructor(props) {
    super(props)
  }

  render() {
    var {mod, style} = this.props

    mod = assign({
      selected: this.props.selected,
      stretch: this.props.stretch,
      first: this.props.first,
      notFirst: !this.props.first,
      last: this.props.last,
    }, mod)

    var icon
    if (this.props.icon) {
      icon = <Icon icon={this.props.icon}
        style={{marginRight: this.props.text ? 4 : 0}}/>
    }

    return <div
      {...this.getBasics()}
      style = {this.getStyle('tabLabel', mod, style)}
      onClick={this.props.onSelect}
      onDragEnter={this.props.onSelect}>

      {icon}
      {this.props.label}
    </div>
  }
}
