import React from 'react'
import Radium from 'radium'
import pureRender from 'pure-render-decorator'
import MatterBasics from '../utils/MatterBasics'

export default class Tooltip extends React.Component {

  static propTypes = {
    children: React.PropTypes.element.isRequired //only one child is allowed
  }

  constructor(props) {
    super(props)

    this.state = {
      show: false
    }
  }

  showDelayed() {
    clearTimeout(this._showSetT)
    this._showSetT = setTimeout(() => this.show(), 1234)
  }

  show = () => {
    var domNode = React.findDOMNode(this)
    var parent = domNode.parentNode
    var br = parent.getBoundingClientRect()

    this.setState({
      show: true,
      style: {
        left: br.left - this.props.width - 5,
        top: br.top,
      }
    })
  }

  hide = () => {
    clearTimeout(this._showSetT)
    this.setState({show: false})
  }

  componentDidMount() {
    this.targetNode = React.findDOMNode(this).parentNode
    this.targetNode.addEventListener('mouseover', this.showDelayed)
    this.targetNode.addEventListener('mouseleave', this.hide)
  }

  componentWillUnmount() {
    this.targetNode.removeEventListener('mouseover', this.showDelayed)
    this.targetNode.removeEventListener('mouseleave', this.hide)
  }

  componentDidUpdate() {
    this.placeContent()
  }

  placeContent() {
    var {place} = this.props
    var full = {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    }
    full.right = full.width
    full.bottom = full.height
    var target = this.targetNode.getBoundingClientRect()
    var content = React.findDOMNode(this).getBoundingClientRect()
    var position = {}

    changePlaceIfNeeded()

    if (isPlaceVertical()) {
      if (place === 'left') {
        position.left = target.left - content.width
      }
      else {
        position.left = target.right
      }
      position.top = target.top + ((target.height - content.height) / 2)
    }
    else {
      if (place === 'top') {
        position.top = target.top - content.height
      }
      else {
        position.top = target.bottom
      }
      position.left = target.left + ((target.width - content.width) / 2)
    }

    this.setState({position})

    function changePlaceIfNeeded() {
      var oppositePlace = getOppositePlace()
      var space = target[palce] - full[palce]
      var oppositeSpace = target[oppositePalce] - full[oppositePalce]
      var size = isPlaceVertical() ? content.width : content.height

      if (space < size && space < oppositeSpace) {
        place = oppositePalce
      }
    }

    function getOppositePlace() {
      switch (place) {
        case 'top': return 'bottom'
        case 'bottom': return 'top'
        case 'left': return 'right'
        case 'right': return 'left'
      }
    }

    function isPlaceVertical() {
      return place === 'left' || place === 'right'
    }
  }

  render () {
    if (this.state.show) {
      return children
    }
    else {
      return <div hidden/>
    }
  }
}
