import React from 'react'
import ReactDOM from 'react-dom'
import Radium from 'radium'
import MatterBasics from '../utils/MatterBasics'
import flyer from '../utils/flyer'

@Radium
@MatterBasics
export default class Tooltip extends React.Component {
  static propTypes = {
    children: React.PropTypes.element.isRequired, //only one child is allowed
    content: React.PropTypes.any
  }

  constructor(props) {
    super(props)
  }

  deleayedShow = () => {
    this.hide()
    this._showSetT = setTimeout(() => this.show(), 2134)
  }

  show() {
    this.hide()
    if (this.props.content) {
      this.disposeLast = flyer({
        x: this.lastX,
        y: this.lastY,
        renderElement: () => this.renderTooltip(),
        wrapperStyle: {pointerEvents: 'none'},
      })
    }
  }

  hide = () => {
    clearTimeout(this._showSetT)
    if (this.disposeLast) {
      this.disposeLast()
      this.disposeLast = undefined
    }
  }

  handleMouseMove = e => {
    this.lastX = e.clientX
    this.lastY = e.clientY
    this.deleayedShow()
  }

  componentDidMount() {
    const node = ReactDOM.findDOMNode(this)
    node.addEventListener('mousemove', this.handleMouseMove)
    node.addEventListener('mouseleave', this.hide)
  }

  componentWillUnmount() {
    const node = ReactDOM.findDOMNode(this)
    node.removeEventListener('mousemove', this.handleMouseMove)
    node.removeEventListener('mouseleave', this.hide)
  }

  renderTooltip() {
    return <div style={this.getStyle('tooltip')}>
      {this.props.content}
    </div>
  }

  render () {
    return this.props.children
  }
}
