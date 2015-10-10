import React from 'react'
import TabLabel from './TabLabel'
import Radium from 'radium'
import shouldPureComponentUpdate from 'react-pure-render/function'
import MatterBasics from '../../utils/MatterBasics'

@Radium
@MatterBasics
export default class TabHeader extends React.Component {
  shouldComponentUpdate = shouldPureComponentUpdate

  static propTypes = {
  }

  static defaultProps = {
    stretchLabels: true,
  }

  constructor(props) {
    super(props)
  }

  render() {
    var {mod, style} = this.props

    var childCount = React.Children.count(this.props.children)

    return <div
      {...this.getBasics()}
      style = {this.getStyle('tabHeader', mod, style)}>

      {React.Children.map(this.props.children, (child, idx) => {

        return <TabLabel
          stretch = {this.props.stretchLabels}
          first = {idx === 0}
          last = {idx === childCount - 1}
          selected = {this.props.currTabIdx === idx}
          icon = {child.props.icon}
          label = {child.props.label}
          onSelect = {() => this.props.onSelectTab(idx)}/>
      })}
    </div>
  }
}
