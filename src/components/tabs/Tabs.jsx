import React from 'react'
import TabHeader from './TabHeader'
import Radium from 'radium'
import shouldPureComponentUpdate from 'react-pure-render/function'
import MatterBasics from '../../utils/MatterBasics'

@Radium
@MatterBasics
export default class Tabs extends React.Component {
  shouldComponentUpdate = shouldPureComponentUpdate

  static propTypes = {
  }

  static defaultProps = {
    stretchLabels: true,
    defaultTabIdx: 0,
    currentTabIdx: undefined,
  }

  constructor(props) {
    super(props)

    this.state = {
      currentTabIdx: props.defaultTabIdx,
    }
  }

  handleSelectTab(idx) {
    this.setState({currentTabIdx: idx})

    if (this.props.onChangeTabIdx) {

      this.props.onChangeTabIdx(idx)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentTabIdx !== undefined) {
      this.setState({currentTabIdx: nextProps.currentTabIdx})
    }
  }

  render() {
    var {mod, style} = this.props
    var currentTab

    React.Children.forEach(this.props.children, (child, idx) => {
      if(this.state.currentTabIdx === idx) {
        currentTab = child
      }
    })

    return <div
      {...this.getBasics()}
      style = {this.getStyle('tabBase', mod, style)}>

      <TabHeader
        currentTabIdx = {this.state.currentTabIdx}
        onSelectTab = {idx => this.handleSelectTab(idx)}
        children = {this.props.children}
        stretchLabels = {this.props.stretchLabels}/>

      <div style={this.getStyle('tabCont', mod)}>
        {currentTab}
      </div>
    </div>
  }
}
