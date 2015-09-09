import React, {PropTypes} from 'react'
import Radium from 'radium'
import pureRender from 'pure-render-decorator'
import MatterBasics from '../../utils/MatterBasics'
import Scrollbar from './Scrollbar'

@Radium
@pureRender
@MatterBasics
export default class Scrollable extends React.Component {
  static propTypes = {
    // children: React.PropTypes.element.isRequired,
    verticalScroll: React.PropTypes.number,
    onChangeVerticalScroll: React.PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {
      verticalScroll: 0,
      containerHeight: 0,
      contentHeight: 0,
    }
  }

  handleVerticalScroll = (scroll) => {
    scroll = Math.max(0, Math.min(this.getMaxVerticalScroll(), scroll))

    this.setState({verticalScroll: scroll})
    if (this.props.onChangeVerticalScroll) {
      this.props.onChangeVerticalScroll(scroll)
    }
  }

  handleWheel = (e) => {
    e.stopPropagation()
    e.preventDefault()
    const way = e.deltaY / 3
    const {verticalScroll} = this.state
    this.handleVerticalScroll(verticalScroll + way)
  }

  getMaxVerticalScroll() {
    const {containerHeight, contentHeight} = this.state
    return contentHeight - containerHeight
  }

  setSizes = () => {
    const containerNode = React.findDOMNode(this)
    const contentNode = containerNode.firstChild
    const containerBr = containerNode.getBoundingClientRect()
    const contentBr = contentNode.getBoundingClientRect()
    this.setState({
      containerHeight: containerBr.height,
      contentHeight: contentBr.height,
    })
  }

  renderChildren(top) {
    return React.Children.map(this.props.children, child => {
      const style = {...child.props.style, transform: `translateY(${top}px)`}
      return React.cloneElement(child, {style})
    })
  }

  render() {
    const {mod, style} = this.props
    const {containerHeight, contentHeight} = this.state
    const verticalScroll = this.props.verticalScroll === undefined
      ? this.state.verticalScroll
      : this.props.verticalScroll
    const maxVerticalScroll = this.getMaxVerticalScroll()

    return <div
      {...this.getBasics(verticalScroll)}
      onWheel = {this.handleWheel}
      style = {{...style, overflow: 'hidden', position: 'relative'}}>

      {this.renderChildren(-verticalScroll)}
      {maxVerticalScroll > 0 && <Scrollbar
        type = 'vertical'
        scroll = {verticalScroll}
        height = {containerHeight}
        maxScroll = {maxVerticalScroll}
        onChange = {this.handleVerticalScroll}/>}
    </div>
  }

  componentDidMount() {
    this.setSizes()
    this._setSizesSetI = setInterval(this.setSizes, 312)
  }

  componentWillUnmount() {
    clearInterval(this._setSizesSetI)
  }
}
