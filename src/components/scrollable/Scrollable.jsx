import React from 'react'
import Radium from 'radium'
import MatterBasics from '../utils/MatterBasics'

@Radium
@MatterBasics
export default class Scrollable extends React.Component {
  static propTypes = {
    children: React.PropTypes.element.isRequired,
    verticalScroll: React.PropTypes.number,
    onChangeVerticalScroll: React.PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {
      verticalScroll
    }
  }

  handleVerticalScroll = (scroll) => {
    this.setState({verticalScroll: scroll})
    if (this.props.onChangeVerticalScroll) {
      this.props.onChangeVerticalScroll(scroll)
    }
  }

  renderChildren() {
    const {children} = this.props
    const position = children.props.style && children.props.style.position

    return position === 'absolute' || position === 'relative'
      ? children
      : React.cloneElement(children, {style: {
        ...children.props.style,
        position: 'relative'
      }})
  }

  render() {
    const {props, state} = this
    const {mod, style} = props
    const verticalScroll = props.verticalScroll === undefined
      ? state.verticalScroll
      : props.verticalScroll

    return <div
      {...this.getBasics()}
      style = {this.getStyle('panel', mod, style)}>

      {this.renderChildren()}
      <ScrollBar
        type = 'vertical'
        scroll = {verticalScroll}
        height = {containerHeight}
        maxScroll = {contentHeight}
        onChange = {this.handleVerticalScroll}/>
    </div>
  }
}
